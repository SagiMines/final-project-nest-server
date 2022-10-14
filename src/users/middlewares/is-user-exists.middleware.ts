import { HttpException, HttpStatus, Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { UsersService } from "../users.service";
import * as bcrypt from 'bcrypt'
@Injectable()
export class IsUserExistsMiddleware implements NestMiddleware {
    constructor(private readonly usersService: UsersService){}
    async use(req: Request, res: Response, next: NextFunction) {
        
        const id = Number(req.params.id)
        const user = req.body
        if(!isNaN(id)) {
            // If the user is updating his password
            if((await this.usersService.findById(id))){
                if(user.password !== (await this.usersService.findById(id)).password) {
                    const salt = await bcrypt.genSalt();
                    const hashedUserNewPassword = await bcrypt.hash(user.password, salt);
                    req.body.password = hashedUserNewPassword
                }
                next()
            } else throw new HttpException('No user with the provided id was found', HttpStatus.BAD_REQUEST)
        } else throw new HttpException('The id parameter must contain only numeric values', HttpStatus.BAD_REQUEST)
    }
}