import { HttpException, HttpStatus, Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { ProductImagesService } from "../product-images.service";

@Injectable()
export class AreProductImagesMiddleware implements NestMiddleware {
    constructor(private readonly productImagesService: ProductImagesService){}
    async use(req: Request, res: Response, next: NextFunction) {

        if(!(await this.productImagesService.getProductImages()).length){
            throw new HttpException('No such images available', HttpStatus.BAD_REQUEST)
        }
        next()
    }
}