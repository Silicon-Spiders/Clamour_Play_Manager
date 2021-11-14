import os from "os";
import nodemailer from "nodemailer";

import config from "$lib/config";

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
  to: "relkenwilliam@gmail.com",
  subject: "Confirmation",
  text: "Hello, this is an automated message confirming we have received your submission"
};

export async function post(req) {
  if (req.body.title != null) {
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
    
  } else {
    return {
      message: "no email to send to."
    }
  }
}

