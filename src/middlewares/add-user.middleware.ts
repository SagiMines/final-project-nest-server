import { HttpException, HttpStatus, Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { UsersService } from "../users/users.service";
import * as bcrypt from 'bcrypt'
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
        this.usersService.addUser(req.body)
        next()
    }
    
}