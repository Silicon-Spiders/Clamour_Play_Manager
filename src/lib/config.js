import dotenv from 'dotenv';
dotenv.config();

export default {
    smtp: process.env['SMTP_SERV'],
    port: process.env['SMTP_PORT'],
    user: process.env['SMTP_USER'],
    pass: process.env['SMTP_PASS'],
    from: process.env['FROM_EMAIL'],
}