import { HttpException, HttpStatus, Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { CartService } from "../cart.service";

@Injectable()
export class UpdateCartItemMiddleware implements NestMiddleware {
    constructor(private readonly cartService: CartService){}
    async use(req: Request, res: Response, next: NextFunction) {
        
        let {['user-id']: userId, ['product-id']: productId, amount} = req.query
        if(userId && productId && amount) {
            if(!isNaN(Number(userId)) && !isNaN(Number(productId)) && !isNaN(Number(amount)) ) {
                if(await this.cartService.getCartByUserAndProductIds(Number(userId), Number(productId))) {
                    next()
                } else throw new HttpException(`No cart item exists with userId=${userId} and productId=${productId}`, HttpStatus.BAD_REQUEST)
            } else throw new HttpException(`Wrong input: Please enter only numberic values`, HttpStatus.BAD_REQUEST)
        } else throw new HttpException(`Wrong input: Some necessary queries are missing`, HttpStatus.BAD_REQUEST)

    }
}
