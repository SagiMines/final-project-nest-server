import { HttpException, HttpStatus, Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { UsersService } from "../users.service";
import * as bcrypt from 'bcrypt'

@Injectable()
export class IsPasswordCorrectMiddleware implements NestMiddleware {
    constructor(private readonly usersService: UsersService){}
    async use(req: Request, res: Response, next: NextFunction) {
        
        const enteredPassword = req.body.enteredPassword
        const userId = Number(req.params.id)
        const user = await this.usersService.findById(userId)
        if(user) {
            const arePasswordsTheSame = await bcrypt.compare(
                enteredPassword,
                user.password
              );
            if(arePasswordsTheSame) {
                next()
            } else throw new HttpException('The passwords are not the same', HttpStatus.BAD_REQUEST)
        } else throw new HttpException('No user with the provided id was found', HttpStatus.BAD_REQUEST)
    }
}