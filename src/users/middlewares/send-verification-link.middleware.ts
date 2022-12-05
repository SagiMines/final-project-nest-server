import { HttpException, HttpStatus, Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { UsersService } from "./../users.service";
import * as bcrypt from 'bcrypt'
import * as cryptoJS from 'crypto-js'
import { sendLinkViaEmail } from "./../../mailer/nodeMailer";
// applies to POST requests in route /orders
@Injectable()
export class SendVerificationLinkMiddleware implements NestMiddleware {
    constructor(private readonly usersService: UsersService){}
    async use(req: Request, res: Response, next: NextFunction) {
        if(req.query.email) {
            const email : string = req.query.email.toString()
            const user = await this.usersService.findByEmail(email)
            if(user) {
                const tokenLife = new Date().getTime() + 2 * 60 * 1000
                const encryptedUserIdAndDate = (cryptoJS.AES.encrypt(`${user.id} ${tokenLife}`, process.env.CRYPTO_SECRET)).toString()
                sendLinkViaEmail(req, email, encryptedUserIdAndDate, 'Your verification link to WorkShop!')
            } else throw new HttpException('This user does not exist', HttpStatus.CONFLICT)
        }
        next()
    }
    
}