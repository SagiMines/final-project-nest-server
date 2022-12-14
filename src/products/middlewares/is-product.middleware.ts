import { HttpException, HttpStatus, Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { ProductsService } from "../products.service";

@Injectable()
export class IsProductMiddleware implements NestMiddleware {
    constructor(private readonly productsService: ProductsService){}
    async use(req: Request, res: Response, next: NextFunction) {
        // If we are at the sorting route
        if(req.query['category-id'] || req.query['value']) {
            next()
            // Other routes
        }

        else {
            const id = Number(req.params.id)
            if(!(await this.productsService.getProduct(id))){
                throw new HttpException('No such product', HttpStatus.BAD_REQUEST)
            }
            next()

        }
    }
}