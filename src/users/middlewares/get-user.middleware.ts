import { HttpException, HttpStatus, Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { UsersService } from "../users.service";
import * as bcrypt from 'bcrypt'

@Injectable()
export class GetUserMiddleware implements NestMiddleware {
    constructor(private readonly usersService: UsersService){}
    async use(req: Request, res: Response, next: NextFunction) {
        
        const session = req.session
        const userEmail = session['forgotPasswordEmail']
        if(userEmail) {
            req['userEmail'] = userEmail
           next()

        } else throw new HttpException('Request timeout', HttpStatus.REQUEST_TIMEOUT)
    }
}