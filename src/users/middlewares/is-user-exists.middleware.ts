import { HttpException, HttpStatus, Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { UsersService } from "../users.service";

@Injectable()
export class IsUserExistsMiddleware implements NestMiddleware {
    constructor(private readonly usersService: UsersService){}
    async use(req: Request, res: Response, next: NextFunction) {
        
        const id = Number(req.params.id)

        if(!isNaN(id)) {
            if((await this.usersService.findById(id))){
                next()
            } else throw new HttpException('No user with the provided id was found', HttpStatus.BAD_REQUEST)
        } else throw new HttpException('The id parameter must contain only numeric values', HttpStatus.BAD_REQUEST)
    }
}