import * as nodeMailer from 'nodemailer';
import * as dotenv from 'dotenv'
import { Request } from "express";
dotenv.config()

const transporter = nodeMailer.createTransport({
  service: process.env.MAILER_SERVICE,
  auth: {
    user: process.env.MAILER_USER,
    pass: process.env.MAILER_PASS,
  },
});

const options = (req: Request, email: string, token: string, subject: string) => ({
    from: process.env.MAILER_USER,
    to: email,
    subject,
    text: `${req.protocol}://${req.get('host')}${req.url}?token=${token}`,
});
  
export const sendLinkViaEmail = (req: Request, email: string, token: string, subject: string) => {
    transporter.sendMail(options(req, email, token, subject), (err, info) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log(`Sent: ${info.response}`);
    });
  };
