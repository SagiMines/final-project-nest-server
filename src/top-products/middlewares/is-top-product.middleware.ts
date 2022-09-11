import { HttpException, HttpStatus, Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { TopProductsService } from "../top-products.service";
// import { ProductsService } from "../products.service";

@Injectable()
export class IsTopProductMiddleware implements NestMiddleware {
    constructor(private readonly topProductsService: TopProductsService){}
    async use(req: Request, res: Response, next: NextFunction) {
        
        const id = Number(req.params.id)
        if(!await this.topProductsService.getTopProduct(id)){
            throw new HttpException('No such product', HttpStatus.BAD_REQUEST)
        }
        next()
    }
}