import nodemailer from "nodemailer";
import config from "$lib/config";

let testAccount;

(async function() {
  testAccount = await nodemailer.createTestAccount();
})()


let transporter = nodemailer.createTransport({
  host: config.smtp,
  port: config.port,
  secure: true,
  auth: {
    user: config.user,
    pass: config.pass
  }
});

// // This is a test mailer that does not require an account to use
// let transporter = nodemailer.createTransport({
//   host: "smtp.ethereal.email",
//   port: 587,
//   secure: false, // true for 465, false for other ports
//   auth: {
//     user: testAccount.user, // generated ethereal user
//     pass: testAccount.pass, // generated ethereal password
//   },
// });

message = {
  from: '"Clamour Theatre Group" <'+ config.from +'>',
  to: "",
  subject: "",
  text: ""
};

export default async function sendEmail(email, subject, text) {
  message.to = email
  message.subject = subject
  message.text = text
  await transporter.sendMail(message);
  return;
}