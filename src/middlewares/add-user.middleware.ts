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
        const hashedUserPassword = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashedUserPassword;
        // this.usersService.addUser(req.body)
        const session = req.session

        session['awaitingApproval'] = {...req.body}

        let encryptedUserEmail: string
        try {
            encryptedUserEmail = (cryptoJS.AES.encrypt(req.body.email, process.env.CRYPTO_SECRET)).toString()
            sendLinkViaEmail(req, req.body.email, encryptedUserEmail, 'Your verification link to WorkShop!')
        } catch {
          throw new HttpException('Could not encrypt the user email', HttpStatus.CONFLICT)
        }

        next()
    }
    
}