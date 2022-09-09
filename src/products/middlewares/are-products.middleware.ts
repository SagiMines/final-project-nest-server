import { HttpException, HttpStatus, Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { ProductsService } from "../products.service";

@Injectable()
export class AreProductsMiddleware implements NestMiddleware {
    constructor(private readonly productsService: ProductsService){}
    async use(req: Request, res: Response, next: NextFunction) {
        if(!(await this.productsService.getProducts()).length ){
            throw new HttpException('No products available', HttpStatus.BAD_REQUEST)
        }
        next()
    }
}