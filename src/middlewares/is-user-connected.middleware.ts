import { HttpException, HttpStatus, Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { UsersService } from "../users/users.service";
import * as cryptoJS from 'crypto-js'

@Injectable()
export class IsUserExistMiddleware implements NestMiddleware {
    constructor(private readonly usersService: UsersService){}
    async use(req: Request, res: Response, next: NextFunction) {
        const encryptedUserId = req.params.encryptedUserId
        let decryptedUserId
            try {
                decryptedUserId = cryptoJS.AES.decrypt(encryptedUserId, 'dd##$FD34tg!!!2')
            } catch {
                throw new HttpException('Could not decrypt the user ID', HttpStatus.CONFLICT)
            }

            decryptedUserId = decryptedUserId.toString(cryptoJS.enc.Utf8);
            if(this.usersService.findById(decryptedUserId)) {
                next()
            } else throw new HttpException('No such user ID exist', HttpStatus.BAD_REQUEST) 
    }
    
}