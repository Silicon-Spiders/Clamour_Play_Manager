import os from "os";
// import nodemailer from "nodemailer";
import fs, { readFile } from "fs";
import { PDFDocument } from 'pdf-lib';

import config from "$lib/config";
import clientPromise from '$lib/mongodb-client';
import { Console } from "console";

// let transporter = nodemailer.createTransport({
//   host: config.smtp,
//   port: config.port,
//   auth: {
//     user: config.user,
//     pass: config.pass
//   }
// });

// message = {
//   from: "Clamour Theater Group",
//   to: "",
//   subject: "Confirmation",
//   text: "Hello, this is an automated message confirming we have received your submission"
// };

export async function get() {
  const dbConnection = await clientPromise;
  const db = await dbConnection.db("Clamour");
  const collection = await db.collection('plays');
  const plays = await collection.find({}).toArray();
  console.log(plays);
  return {
    body: { plays },
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
    console.log(`fileName = ${file} | i = ${i}`);
    let fileName = file.split(".")[0];
    fileName = fileName.split("(")[0];
    console.log(fileName+"="+fileTitle);
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
  const collection = await db.collection('plays');
  const pageCount = await getPages(newFilePath + `.pdf`);
  const author = body.lname + ", " + body.fname;
  let playData = {
    title: body.title,
    author: author,
    women: body.actors_women,
    men: body.actors_men,
    either: body.actors_neutral,
    actexplain: body.actor_explain,
    filename: newFilePath,
    synopsis: body.synopsis,
    future: body.play_future,
    pagecount: pageCount,
  }
  const inserted = await collection.insertOne(playData);
  console.log(inserted);
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
  console.log(pages);
  return pages;
}

// function sendEmail(email) {
//   message.to = email
//   transporter.sendMail(message, function (err, info) {
//     if (err) {
//       console.log(err)
//       return {
//         message: "There was an error sending an email"
//       }
//     } else {
//       console.log(info);
//       return {
//         message: "You should get a confirmation email shortly."
//       }
//     }
//   });
// }
