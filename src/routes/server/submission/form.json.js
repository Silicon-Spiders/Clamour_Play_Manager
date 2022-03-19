import fs, { readFile } from "fs";
import { PDFDocument } from 'pdf-lib';
import path from 'path';
import os from 'os';

import sendEmail from "$lib/emailer";
import config from "$lib/config";
import { getAuthorFromEmail, addPlay, addAuthor } from "$lib/dbFunctions";
import * as GoogleDriveService from '$lib/api-functions/googleDriveService';
// import { Headers } from "@sveltejs/kit/install-fetch";

// FOR TESTING NEW GOOGLE DRIVE CODE
// export async function get() {
//   let stream = await GoogleDriveService.getFile("109bg44MqmbaIxw8TPkDZCTvuj-48LnWC");
//   let name = "play.pdf";

//   name = encodeURIComponent(name);

//   let header = new Headers({
//       'Content-disposition':'inline; filename="' + name + '"',
//       'Content-type':'application/pdf'
//   });

//   let body = new Uint8Array(stream);
  
//   return {
//       status: 200,
//       header,
//       body
//   }
// }

export async function post({params, request}) {
  let body = await request.json();
  let loc = body.path;
  let fileTitle = body.title +"_by_"+ body.fname + `_` + body.lname;
  fileTitle = fileTitle.split(' ').join('_');
  let filePath = path.join(os.tmpdir(), loc);
  let filename = fileTitle + ".pdf"

  let fileId = await GoogleDriveService.saveFile(loc, filename);
  const pageCount = await getPages(filePath);

  fs.unlinkSync(filePath);

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
    authorID = await addAuthor(authorData);
    authorID = await getAuthorFromEmail(body.email)._id
  } else {
    authorID = author;
  }

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
    gDrive: fileId,
    synopsis: body.synopsis,
    future: body.play_future,
    length: pageCount,
  }
  const inserted = await addPlay(playData);
  console.log(inserted);

  await sendEmail(body.email, "Confirmation" , "Hello " + authorName + ", this is an automated message confirming we have received your submission of " + body.title);
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
  const author = await getAuthorFromEmail(email);
  if (author == null) {
    return false;
  }
  else {
    return author._id;
  }
}