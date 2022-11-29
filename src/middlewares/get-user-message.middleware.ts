import { HttpException, HttpStatus, Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { UsersService } from "../users/users.service";
import {receiveContactUsMessage} from '../mailer/nodeMailer'
// applies to POST requests in route /orders
@Injectable()
export class GetUserMessageMiddleware implements NestMiddleware {
    constructor(private readonly usersService: UsersService){}
    async use(req: Request, res: Response, next: NextFunction) {
            const fullName = req.body.fullName
            const email = req.body.email
            const subject = req.body.subject
            const message = req.body.message

            if(fullName && email && subject && message) {
                receiveContactUsMessage(fullName, email, subject, message)
                next()
            } else throw new HttpException('Missing some of the data.', HttpStatus.BAD_REQUEST)
        
        }

    }