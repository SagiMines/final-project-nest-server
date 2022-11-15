import { HttpException, HttpStatus, Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { UsersService } from "../users/users.service";
import * as bcrypt from 'bcrypt'
import * as cryptoJS from 'crypto-js'
// applies to POST requests in route /orders
@Injectable()
export class VerifyMailMiddleware implements NestMiddleware {
    constructor(private readonly usersService: UsersService){}
    async use(req: Request, res: Response, next: NextFunction) {
        // The Email verification link's token is the user encrypted email address
        const encryptedUserEmail = ((req.query.token).toString()).split(' ').join('+')
        let decryptedUserEmail: string
            try {
                decryptedUserEmail = (cryptoJS.AES.decrypt(encryptedUserEmail.toString(), 'dd##$FD34tg!!!2')).toString(cryptoJS.enc.Utf8)
            } catch {
                throw new HttpException('Could not decrypt the user email', HttpStatus.CONFLICT)
            }

           
        // When the new registered user is confirmed he is automatically logged in the site
        if(decryptedUserEmail === req.session['awaitingApproval'].email) {
            await this.usersService.addUser(req.session['awaitingApproval'])
            const addedUser = await this.usersService.findByEmail(req.session['awaitingApproval'].email)
            let encryptedUserId: string
            try {
                encryptedUserId = (cryptoJS.AES.encrypt(addedUser['id'].toString(), 'dd##$FD34tg!!!2')).toString()
            } catch {
                throw new HttpException('Could not encrypt the user ID', HttpStatus.CONFLICT)
            }
            
            res.cookie('user_id', encryptedUserId, {maxAge: 365*24*60*60*1000, httpOnly: false})
            const session = req.session
            session['authenticated'] = true;
            session['user'] = { ...addedUser };
            delete req.session['awaitingApproval']
            next()
        } else {
            throw new HttpException('Wrong address', HttpStatus.NOT_FOUND)
        }
        
    }
}   