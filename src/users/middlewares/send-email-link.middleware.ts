import { HttpException, HttpStatus, Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { UsersService } from "../users.service";
import * as cryptoJS from 'crypto-js'
import { sendLinkViaEmail } from "./../../mailer/nodeMailer";
@Injectable()
export class SendEmailLinkMiddleware implements NestMiddleware {
    constructor(private readonly usersService: UsersService){}
    async use(req: Request, res: Response, next: NextFunction) {
        const query = req.query
        const session = req.session
        
        if(query.email) { 
        const email = query.email.toString()
        if(await this.usersService.findByEmail(email)) {
            session['forgotPasswordEmail'] = email
          
            let encryptedUserEmail: string
            try {
                encryptedUserEmail = (cryptoJS.AES.encrypt(email, 'dd##$FD34tg!!!2')).toString()
                sendLinkViaEmail(req, email, encryptedUserEmail, 'Link to change your password')
            } catch {
              throw new HttpException('Could not encrypt the user email', HttpStatus.CONFLICT)
            }
            next()
        
        } else throw new HttpException('The email provided is not related to any user in the database', HttpStatus.BAD_REQUEST)
        } else if(query.token) {
            
            const encryptedUserEmail = query.token.toString().split(' ').join('+')
            let decryptedUserEmail : string
            try {
                decryptedUserEmail = (cryptoJS.AES.decrypt(encryptedUserEmail, 'dd##$FD34tg!!!2')).toString(cryptoJS.enc.Utf8)
            } catch {
                throw new HttpException('Could not decrypt the user Email', HttpStatus.CONFLICT)
            }

            if(session['forgotPasswordEmail'] === decryptedUserEmail) {
                next()
            } else if(!session['forgotPasswordEmail']) {
                throw new HttpException('The link is no longer available', HttpStatus.REQUEST_TIMEOUT)
            }
            else throw new HttpException('The email provided is not related to any user in the database', HttpStatus.BAD_REQUEST)
        }
    }

}