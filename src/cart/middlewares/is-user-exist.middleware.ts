import { HttpException, HttpStatus, Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { UsersService } from "../../users/users.service";

@Injectable()
export class IsUserExistMiddleware implements NestMiddleware {
    constructor(private readonly usersService: UsersService){}
    async use(req: Request, res: Response, next: NextFunction) {
        
        const userId = Number(req.params.id)

        if(!isNaN(userId)) {
            if((await this.usersService.findById(userId))) {
                next()
            } else throw new HttpException(`No user exists with id=${userId}`, HttpStatus.BAD_REQUEST)
        } else throw new HttpException(`Wrong input: Please enter only numberic values`, HttpStatus.BAD_REQUEST)
    }
}
