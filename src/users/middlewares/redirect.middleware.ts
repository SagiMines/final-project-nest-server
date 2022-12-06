import { HttpException, HttpStatus, Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { UsersService } from "../users.service";
import * as bcrypt from 'bcrypt'
import * as cryptoJS from 'crypto-js'
@Injectable()
export class RedirectMiddleware implements NestMiddleware {
    constructor(private readonly usersService: UsersService){}
    async use(req: Request, res: Response, next: NextFunction) {
            const encryptedEmail: string = req.query.email.toString()
            let decryptedUserEmail : string
                try {
                    decryptedUserEmail = (cryptoJS.AES.decrypt(encryptedEmail, process.env.CRYPTO_SECRET)).toString(cryptoJS.enc.Utf8)
                } catch {
                    throw new HttpException('Could not decrypt the user Email', HttpStatus.CONFLICT)
                }
                
            const userEmail = decryptedUserEmail
            const user = await this.usersService.findByEmail(userEmail)
            const userId: string = user.id.toString()
            let encryptedUserId: string
            try {
                encryptedUserId = (cryptoJS.AES.encrypt(userId, process.env.CRYPTO_SECRET)).toString()
            } catch {
              throw new HttpException('Could not encrypt the user email', HttpStatus.CONFLICT)
            }
            res.cookie('user_id', encryptedUserId, process.env.NODE_ENV === 'production' ? {domain: '.workshop-il.com',  secure: true, maxAge: 365*24*60*60*1000, httpOnly: false, sameSite: 'none'} : {maxAge: 365*24*60*60*1000, httpOnly: false})
            const session = req.session
            session['authenticated'] = true;
            next()
        }
        
    }