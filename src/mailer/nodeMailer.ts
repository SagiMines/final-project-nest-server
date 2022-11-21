import * as nodeMailer from 'nodemailer';
import * as dotenv from 'dotenv'
import { Request } from "express";
import * as hbs from 'nodemailer-express-handlebars'
import * as  path from 'path';
import { UserDto } from 'src/users/user-dto';
import { join } from 'path';
dotenv.config()

const handleBarOptions : hbs.NodemailerExpressHandlebarsOptions = {
  viewEngine: {
    extname: ".handlebars",
    partialsDir: path.resolve('./../../views'),
    defaultLayout: false
  }
  ,
  viewPath: path.resolve(__dirname, '../../views/'),
  extName: ".handlebars"
}

const transporter = nodeMailer.createTransport({
  service: process.env.MAILER_SERVICE,
  auth: {
    user: process.env.MAILER_USER,
    pass: process.env.MAILER_PASS,
  },
});

const orderTransporter = nodeMailer.createTransport({
  service: process.env.MAILER_SERVICE,
  auth: {
    user: process.env.MAILER_USER,
    pass: process.env.MAILER_PASS,
  },
});


const options = (req: Request, email: string, token: string, subject: string, text?: string) => ({
  from: process.env.MAILER_USER,
  to: email,
  subject,
  text: text ? text : `${req.protocol}://${req.get('host')}${req.url.split('?')[0]}?token=${token}`,
});
const orderConfirmationOptions = ( email: string, user: UserDto, cartProducts: {id: number, categoryId: number, productName: string, unitPrice: number, unitsInStock: number, description: string, discount: number, publishDate: string, amount: number, image: string, finalPrice: number, priceWithoutDiscount: number}[], orderDate: string, orderId: number, cartTotalWithoutDiscount: number, cartTotalWithDiscount:number, saving:number,  subject: string) => ({
  from: process.env.MAILER_USER,
  to: email,
  subject,
  template: 'index',
  attachments: [{
    filename: 'workshop-logo.png',
    path: join(__dirname, '..','..', 'public/workshop-logo.png'),
    cid: 'workshop-logo'
  }],
  context: {
    user,
    cartProducts,
    orderDate,
    orderId,
    cartTotalWithoutDiscount,
    cartTotalWithDiscount,
    saving : +saving.toFixed(2),
    randomness : Date.now(),
    prod: process.env.NODE_ENV === 'production' ? true : false
  }
})

export const sendLinkViaEmail = (req: Request, email: string, token: string, subject: string, text?: string) => {
  transporter.sendMail(options(req, email, token, subject, text), (err, info) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log(`Sent: ${info.response}`);
    });
  };
  
export const sendOrderConfirmationViaEmail = ( email: string, user: UserDto, cartProducts: {id: number, categoryId: number, productName: string, unitPrice: number, unitsInStock: number, description: string, discount: number, publishDate: string, amount: number, image: string, finalPrice: number, priceWithoutDiscount: number}[], orderDate: string, orderId: number, cartTotalWithoutDiscount: number, cartTotalWithDiscount:number, saving:number,  subject: string) => {
  orderTransporter.use('compile', hbs(handleBarOptions))
  orderTransporter.sendMail(orderConfirmationOptions(email, user, cartProducts, orderDate, orderId, cartTotalWithoutDiscount, cartTotalWithDiscount, saving,  subject), (err, info) => {
    
    if (err) {
      console.log(err);
      return;
    }
    console.log(`Sent: ${info.response}`);
    
  })
}
