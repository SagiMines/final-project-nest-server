import { HttpException, HttpStatus, Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { TopProductsService } from "../top-products.service";
// import { ProductsService } from "../products.service";

@Injectable()
export class AreTopProductsMiddleware implements NestMiddleware {
    constructor(private readonly topProductsService: TopProductsService){}
    async use(req: Request, res: Response, next: NextFunction) {
        if(!(await this.topProductsService.getTopProducts()).length ){
            throw new HttpException('No products available', HttpStatus.BAD_REQUEST)
        }
        next()
    }
}