import { HttpException, HttpStatus, Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { UsersService } from "../users/users.service";
// applies to POST requests in route /orders
@Injectable()
export class LogOutUserMiddleware implements NestMiddleware {
    constructor(private readonly usersService: UsersService){}
    async use(req: Request, res: Response, next: NextFunction) {
        const userId = req.body['userId']
        if(!userId) {
            throw new HttpException('No user is connected.', HttpStatus.BAD_REQUEST)
        } else if(!this.usersService.findById(userId)) {
            throw new HttpException('No user exists with the ID provided.', HttpStatus.BAD_REQUEST)
        } else next()
    }
        
}