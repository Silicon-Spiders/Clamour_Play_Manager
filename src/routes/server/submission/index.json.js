import os from "os";
import fs, { readFile } from "fs";
import { PDFDocument } from 'pdf-lib';
import sendEmail from "$lib/emailer";
import config from "$lib/config";
import clientPromise from '$lib/mongodb-client';
import { getPlays, getEvaluators, getEvaluatorsSanitized } from "$lib/dbFunctions";
import { Console } from "console";
import { getDefaultSettings } from "http2";

export async function get() {
  const plays = await getPlays();
  const evaluators = await getEvaluatorsSanitized();
  return {
    body: { plays, evaluators },
  }
}

export async function post(req) {
  let path = req.body.path;
  let fileTitle = req.body.title +"_by_"+ req.body.fname + `_` + req.body.lname;
  fileTitle = fileTitle.split(' ').join('_');
  let oldFilePath = `./${config.uploadDir}/${path}` ;
  let newFilePath = `./${config.playSubmissionDir}/${fileTitle}`;
  let filenames = fs.readdirSync(`./${config.playSubmissionDir}/`);
  const body =req.body;

  //read data from upload folder then write to play folder
  const data = fs.readFileSync(
    oldFilePath
  );

  // checks for same file name
  var i = 0;
  filenames.forEach( file => {
    let fileName = file.split(".")[0];
    fileName = fileName.split("(")[0];
    if(fileName == fileTitle){
      i++;
    }
  });

  if(i == 0){
    fs.writeFileSync(newFilePath + `.pdf`, data);
    console.log("wrote file.");
  } else {
    fs.writeFileSync(newFilePath + `(${i}).pdf`, data);
    console.log("copy found.");
  }

  fs.unlinkSync(oldFilePath);

  const dbConnection = await clientPromise;
  const db = await dbConnection.db("Clamour");
  const authorColl = await db.collection('authors');
  const author = await findAuthor(body.email);
  let authorID;

  if (author == false) {
    let authorData = {
      dateOfEntry: getDate(),
      firstName: body.fname,
      middleName: body.mname,
      lastName: body.lname,
      homeEmail: body.email,
      personalWebsite: body.person_website,
      workWebsite: body.work_website,
      mobilePhone: body.phone,
      address1: body.address1,
      address2: body.address2,
      city: body.city,
      state: body.state,
      zip: body.zip,
      province: body.province,
      country: body.country,
      postalCode: body.postal_code,
      meetPref: body.meet_pref,
      profIntro: body.prof_intro,
      personIntro: body.person_intro,
    }
    authorID = await authorColl.insertOne(authorData);
    authorID = authorColl.findOne({ homeEmail: body.email })._id
  } else {
    authorID = author;
  }

  const playColl = await db.collection('plays');
  const pageCount = await getPages(newFilePath + `.pdf`);
  const authorName = body.lname + ", " + body.fname;
  let playData = {
    title: body.title,
    author: authorName,
    authorID: authorID,
    dateOfSubmission: getDate(),
    women: body.actors_women,
    men: body.actors_men,
    either: body.actors_neutral,
    actexplain: body.actor_explain,
    filename: newFilePath,
    synopsis: body.synopsis,
    future: body.play_future,
    length: pageCount,
  }
  const inserted = await playColl.insertOne(playData);

  await sendEmail(body.email, "Confirmation" , "Hello, this is an automated message confirming we have received your submission");

  return {
    status: 200,
    body: {
      inserted
    }
  }
}

async function getPages(filePath) {
  const file = fs.readFileSync(filePath);
  const doc = await PDFDocument.load(file);
  const pages = doc.getPageCount();
  return pages;
}

function getDate(date = new Date()) {
  return date.toISOString().split('T')[0];
}

async function findAuthor(email) {
  const dbConnection = await clientPromise;
  const db = await dbConnection.db("Clamour");
  const authorColl = await db.collection('authors');
  const author = await authorColl.findOne({ homeEmail: email });
  if (author == null) {
    return false;
  }
  else {
    return author._id;
  }
}