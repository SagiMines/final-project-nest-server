import { HttpException, HttpStatus, Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { WishlistService } from "../wishlist.service";
// applies to POST requests in route /orders
@Injectable()
export class AreListsMiddleware implements NestMiddleware {
    constructor(private readonly wishlistService: WishlistService){}
    async use(req: Request, res: Response, next: NextFunction) {
        const query = req.query['user-id']
        
        if( isNaN(Number(query)) || !query){
            throw new HttpException('Wrong value inserted', HttpStatus.BAD_REQUEST)
        }
        // if( !(await this.wishlistService.getListsByUserId(Number(query))).length ) {
        //     throw new HttpException('No lists available for the requested user', HttpStatus.BAD_REQUEST)
        // }
        next()
    }
    
}