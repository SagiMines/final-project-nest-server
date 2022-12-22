import { HttpException, HttpStatus, Injectable, NestMiddleware } from "@nestjs/common";
import e, { NextFunction, Request, Response } from "express";
import { UsersService } from "../users/users.service";
import * as bcrypt from 'bcrypt'
import * as cryptoJS from 'crypto-js'
// applies to POST requests in route /orders
@Injectable()
export class VerifyMailMiddleware implements NestMiddleware {
    constructor(private readonly usersService: UsersService){}
    async use(req: Request, res: Response, next: NextFunction) {
        const encryptedUserIdAndDate = ((req.query.token).toString()).split(' ').join('+')
        let decryptedUserIdAndDate: string | string[]
            try {
                decryptedUserIdAndDate = (cryptoJS.AES.decrypt(encryptedUserIdAndDate.toString(), process.env.CRYPTO_SECRET)).toString(cryptoJS.enc.Utf8)
            } catch {
                throw new HttpException('Could not decrypt the token', HttpStatus.CONFLICT)
            }
        decryptedUserIdAndDate = decryptedUserIdAndDate.split(' ')
        const user = await this.usersService.findById(Number(decryptedUserIdAndDate[0]))
        if(user && !user.approved) {
            if(Number(decryptedUserIdAndDate[1]) > new Date().getTime()) {
                user.approved = true
                await this.usersService.updateUserDetails(user, Number(decryptedUserIdAndDate[0]) )
                let encryptedUserId: string
                try {
                encryptedUserId = (cryptoJS.AES.encrypt(decryptedUserIdAndDate[0].toString(), process.env.CRYPTO_SECRET)).toString()
                } catch {
                throw new HttpException('Could not encrypt the user ID', HttpStatus.CONFLICT)
                }
                res.cookie('user_id', encryptedUserId, process.env.NODE_ENV === 'production' ? {domain: '.workshop-il.com',  secure: true, maxAge: 365*24*60*60*1000, httpOnly: false, sameSite: 'none'} : {maxAge: 365*24*60*60*1000, httpOnly: false})
                const session = req.session
                session['authenticated'] = true;
                if(session['register-verified']) {
                    delete session['register-verified']
                }
                session['register-done'] = true
                next()
            } else throw new HttpException('Request timed out', HttpStatus.GATEWAY_TIMEOUT)
        } else throw new HttpException('User has been verified already', HttpStatus.BAD_GATEWAY)
        
    }
}   