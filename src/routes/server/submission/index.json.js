import os from "os";
// import nodemailer from "nodemailer";
import fs from "fs";

import config from "$lib/config";

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

export async function post(req) {
  let path = req.body.path;
  let fileTitle = req.body.title +"_by_"+ req.body.fname + `_` + req.body.lname;
  fileTitle = fileTitle.split(' ').join('_');
  let oldFilePath = `./${config.uploadDir}/${path}` ;
  let newFilePath = `./${config.playSubmissionDir}/${fileTitle}`;
  let filenames = fs.readdirSync(`./${config.playSubmissionDir}/`);

//   for(var pair of req.body.entries()) {
//     console.log(pair[0]+ ', '+ pair[1]);
//  }

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

  return {message: "Play stored."}
  if (req.body.title != null) {
    
    
  }
  return {
    test: "testing"
  }
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

