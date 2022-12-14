import { HttpException, HttpStatus, Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { UsersService } from "../users/users.service";
import * as bcrypt from 'bcrypt'
import * as cryptoJS from 'crypto-js'
import {sendLinkViaEmail, sendLinkViaEmailGuestOrderRegistration} from '../mailer/nodeMailer'
// applies to POST requests in route /orders
@Injectable()
export class AddUserMiddleware implements NestMiddleware {
    constructor(private readonly usersService: UsersService){}
    async use(req: Request, res: Response, next: NextFunction) {
        if(await this.usersService.findByEmail(req.body.email)){
            throw new HttpException('Email already in use', HttpStatus.BAD_REQUEST)
        }
        const salt = await bcrypt.genSalt();
        const guestPasswordToMail = req.body.password
        const hashedUserPassword = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashedUserPassword;
        const session = req.session
        let encryptedUserIdAndDate: string
        let encryptedUserEmail: string
        if(req.query.guest) {
            try {
                encryptedUserEmail = (cryptoJS.AES.encrypt(req.body.email, process.env.CRYPTO_SECRET)).toString()
                sendLinkViaEmail(req, req.body.email, encryptedUserEmail, 'Your newly created user at WorkShop!',`We've raised the glove and created an account for you!\nYour login details:\nusername: ${req.body.email}\npassword: ${guestPasswordToMail}\nSee you there!`)
                req.body.approved = true
                await this.usersService.addUser(req.body)
            } catch {
              throw new HttpException('Could not encrypt the user email', HttpStatus.CONFLICT)
            }
                next()
        } else {
            try {
                let user
                do {
                    user = await this.usersService.addUser(req.body)
                } while(!(await this.usersService.findByEmail(req.body.email)))
                
                // Two hours life time
                const tokenLife = new Date().getTime() + 2 * 60 * 1000
                encryptedUserIdAndDate = (cryptoJS.AES.encrypt(`${user.id} ${tokenLife}`, process.env.CRYPTO_SECRET)).toString()
                
                if(req.query.from) {
                    const fromPage: string = req.query.from.toString()
                    sendLinkViaEmailGuestOrderRegistration(req, req.body.email, encryptedUserIdAndDate,'Your verification link to WorkShop!', fromPage)
                } else {

                    sendLinkViaEmail(req, req.body.email, encryptedUserIdAndDate, 'Your verification link to WorkShop!')
                }
            } catch {
              throw new HttpException('Could not encrypt the user email', HttpStatus.CONFLICT)
            }
            session['register-verified'] = true
            next()
        }

    }
    
}