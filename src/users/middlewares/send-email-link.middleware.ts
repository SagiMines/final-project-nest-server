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
          
            // Two hours life time
            const tokenLife = new Date().getTime() + 2 * 60 * 1000
            let encryptedUserEmailAndDate: string
            try {
                encryptedUserEmailAndDate = (cryptoJS.AES.encrypt(`${email} ${tokenLife}`, process.env.CRYPTO_SECRET)).toString()
                
                if(req.query.from) {
                    const fromPage: string = req.query.from.toString()
                    sendLinkViaEmailGuestOrderRegistration(req, email, encryptedUserEmailAndDate, 'Link to change your password', fromPage)
                } else {
                    sendLinkViaEmail(req, email, encryptedUserEmailAndDate, 'Link to change your password')
                }
                
            } catch {
              throw new HttpException('Could not encrypt the user email', HttpStatus.CONFLICT)
            }
            next()
        
        } else throw new HttpException('The email provided is not related to any user in the database', HttpStatus.BAD_REQUEST)
        } else if(query.token) {
            const encryptedUserEmail = ((req.query.token).toString()).split(' ').join('+')
            let decryptedUserEmail: string | string[]
            try {
                decryptedUserEmail = (cryptoJS.AES.decrypt(encryptedUserEmail.toString(), process.env.CRYPTO_SECRET)).toString(cryptoJS.enc.Utf8)
            } catch {
                throw new HttpException('Could not decrypt the token', HttpStatus.CONFLICT)
            }
            decryptedUserEmail = decryptedUserEmail.split(' ')
            
            // To cookie
            const decryptedUserEmailToCookie = decryptedUserEmail[0]
            let encryptedUserEmailToCookie : string
            try {
                encryptedUserEmailToCookie = (cryptoJS.AES.encrypt(decryptedUserEmailToCookie, process.env.CRYPTO_SECRET)).toString()
            } catch {
                throw new HttpException('Could not encrypt the user Email', HttpStatus.CONFLICT)
            }
            // If request passed the 2 hours time limit
            if(Number(decryptedUserEmail[1]) > new Date().getTime()) {

                if(await this.usersService.findByEmail(decryptedUserEmail[0])) {
                    res.cookie('forgot-password', encryptedUserEmailToCookie, process.env.NODE_ENV === 'production' ? {domain: '.workshop-il.com',  secure: true, maxAge: 365*24*60*60*1000, httpOnly: false, sameSite: 'none'} : {maxAge: 365*24*60*60*1000, httpOnly: false})
                    next()
                } else throw new HttpException('The email provided is not related to any user in the database', HttpStatus.BAD_REQUEST)
            } else throw new HttpException('Request timed out', HttpStatus.REQUEST_TIMEOUT)
        } else throw new HttpException('Bad credentials', HttpStatus.NOT_FOUND)
    }

}