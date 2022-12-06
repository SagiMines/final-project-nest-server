import { HttpException, HttpStatus, Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { UsersService } from "../users.service";
import * as cryptoJS from 'crypto-js'
import { sendLinkViaEmail, sendLinkViaEmailGuestOrderRegistration } from "./../../mailer/nodeMailer";
@Injectable()
export class SendEmailLinkMiddleware implements NestMiddleware {
    constructor(private readonly usersService: UsersService){}
    async use(req: Request, res: Response, next: NextFunction) {
        const query = req.query
        const session = req.session
        
        if(query.email) { 
        const email = query.email.toString()
        if(await this.usersService.findByEmail(email)) {
          
            let encryptedUserEmail: string
            try {
                encryptedUserEmail = (cryptoJS.AES.encrypt(email, process.env.CRYPTO_SECRET)).toString()
                
                if(req.query.from) {
                    const fromPage: string = req.query.from.toString()
                    sendLinkViaEmailGuestOrderRegistration(req, email, encryptedUserEmail, 'Link to change your password', fromPage)
                } else {
                    sendLinkViaEmail(req, email, encryptedUserEmail, 'Link to change your password')
                }
                
            } catch {
              throw new HttpException('Could not encrypt the user email', HttpStatus.CONFLICT)
            }
            next()
        
        } else throw new HttpException('The email provided is not related to any user in the database', HttpStatus.BAD_REQUEST)
        } else if(query.token) {
            
            const encryptedUserEmail = query.token.toString().split(' ').join('+')
            let decryptedUserEmail : string
            try {
                decryptedUserEmail = (cryptoJS.AES.decrypt(encryptedUserEmail, process.env.CRYPTO_SECRET)).toString(cryptoJS.enc.Utf8)
            } catch {
                throw new HttpException('Could not decrypt the user Email', HttpStatus.CONFLICT)
            }
            if(await this.usersService.findByEmail(decryptedUserEmail)) {
                res.cookie('forgot-password', encryptedUserEmail, process.env.NODE_ENV === 'production' ? {domain: '.workshop-il.com',  secure: true, maxAge: 365*24*60*60*1000, httpOnly: false, sameSite: 'none'} : {maxAge: 365*24*60*60*1000, httpOnly: false})
                next()
            } else throw new HttpException('The email provided is not related to any user in the database', HttpStatus.BAD_REQUEST)
        }
    }

}