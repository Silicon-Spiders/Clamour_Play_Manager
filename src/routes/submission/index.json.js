import os from "os";
import nodemailer from "nodemailer";
import fs from "fs";

import config from "$lib/config";
import { fstat } from "fs";

let transporter = nodemailer.createTransport({
  host: config.smtp,
  port: config.port,
  auth: {
    user: config.user,
    pass: config.pass
  }
});

message = {
  from: "Clamour Theater Group",
  to: "",
  subject: "Confirmation",
  text: "Hello, this is an automated message confirming we have received your submission"
};

export async function post(req) {
  let path = req.body.get("path");

  // fs.readFileSync(path);

  console.log(req.body.get("path"))
  // let json = JSON.stringify(req.body)
  // console.log(json)
  return {req}
  if (req.body.title != null) {
    
    
  }
  return {
    test: "testing"
  }
}

function sendEmail(email) {
  message.to = email
  transporter.sendMail(message, function (err, info) {
    if (err) {
      console.log(err)
      return {
        message: "There was an error sending an email"
      }
    } else {
      console.log(info);
      return {
        message: "You should get a confirmation email shortly."
      }
    }
  });
}

