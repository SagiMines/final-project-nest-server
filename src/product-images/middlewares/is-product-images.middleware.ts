import { HttpException, HttpStatus, Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { ProductImagesService } from "../product-images.service";
// import { ProductsService } from "../products.service";

@Injectable()
export class IsProductImagesMiddleware implements NestMiddleware {
    constructor(private readonly productImagesService: ProductImagesService){}
    async use(req: Request, res: Response, next: NextFunction) {
        const id = Number(req.params.id)
        if(!(await this.productImagesService.getImagesByProductId(id)).length){
            throw new HttpException('No such product', HttpStatus.BAD_REQUEST)
        }
        next()
    }
}