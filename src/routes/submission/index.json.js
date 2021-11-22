import os from "os";
import nodemailer from "nodemailer";
import { FormData } from 'formdata-node';

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
  to: "",
  subject: "Confirmation",
  text: "Hello, this is an automated message confirming we have received your submission"
};

export async function post(req) {
  // const form = new FormData(req.body)
  // console.log(request.body.get("path"));
  // let form = new FormData();
  // // // console.log(req.body.entries())
  // for (const [key, value] of req.body) {
	// 	form.append(key, value);
  //   console.log("key= " + key + " value= " + value)
	// }
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

