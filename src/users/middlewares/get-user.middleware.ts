import { HttpException, HttpStatus, Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { UsersService } from "../users.service";
import * as cryptoJS from 'crypto-js'
@Injectable()
export class GetUserMiddleware implements NestMiddleware {
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
            if(userEmail) {
                req['userEmail'] = userEmail
               
                next()
            } else throw new HttpException('Request timeout', HttpStatus.REQUEST_TIMEOUT)
    }
}