import { HttpException, HttpStatus, Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { UsersService } from "../users/users.service";
import * as bcrypt from 'bcrypt'
import * as cryptoJS from 'crypto-js'
import {sendLinkViaEmail} from '../mailer/nodeMailer'
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
        // this.usersService.addUser(req.body)
        const session = req.session
        let encryptedUserEmail: string
        if(req.query.guest) {
            try {
                encryptedUserEmail = (cryptoJS.AES.encrypt(req.body.email, process.env.CRYPTO_SECRET)).toString()
                sendLinkViaEmail(req, req.body.email, encryptedUserEmail, 'Your newly created user at WorkShop!', `Your password to Workshop is: ${guestPasswordToMail}`)
                await this.usersService.addUser(req.body)
            } catch {
              throw new HttpException('Could not encrypt the user email', HttpStatus.CONFLICT)
            }
               
                // const addedUser = await this.usersService.findByEmail(req.body.email)
                // let encryptedUserId: string
                // try {
                //     encryptedUserId = (cryptoJS.AES.encrypt(addedUser['id'].toString(), process.env.CRYPTO_SECRET)).toString()
                // } catch {
                //     throw new HttpException('Could not encrypt the user ID', HttpStatus.CONFLICT)
                // }
                
                // res.cookie('user_id', encryptedUserId, {maxAge: 365*24*60*60*1000, httpOnly: false})
                // const session = req.session
                // session['authenticated'] = true;
                // session['user'] = { ...addedUser };
                // delete req.session['awaitingApproval']
                next()
        } else {

            session['awaitingApproval'] = {...req.body}
    
            try {
                encryptedUserEmail = (cryptoJS.AES.encrypt(req.body.email, process.env.CRYPTO_SECRET)).toString()
                sendLinkViaEmail(req, req.body.email, encryptedUserEmail, 'Your verification link to WorkShop!')
            } catch {
              throw new HttpException('Could not encrypt the user email', HttpStatus.CONFLICT)
            }
    
            next()
        }

    }
    
}