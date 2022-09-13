import { HttpException, HttpStatus, Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { WishlistService } from "../wishlist.service";
// applies to POST requests in route /orders
@Injectable()
export class IsListMiddleware implements NestMiddleware {
    constructor(private readonly wishlistService: WishlistService){}
    async use(req: Request, res: Response, next: NextFunction) {
        const userId = req.query['user-id']
        const productId = req.query['product-id']
        if( isNaN(Number(userId)) || isNaN(Number(productId)) || !userId || !productId){
            throw new HttpException('Wrong values inserted', HttpStatus.BAD_REQUEST)
        }
        if( !await this.wishlistService.getList(Number(userId), Number(productId)) ) {
            throw new HttpException('No such list', HttpStatus.BAD_REQUEST)
        }
        next()
    }
    
}