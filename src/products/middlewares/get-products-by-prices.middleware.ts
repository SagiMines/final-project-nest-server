import { HttpException, HttpStatus, Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { CategoriesService } from "../../categories/categories.service";
import { ProductsService } from "../products.service";

@Injectable()
export class GetProductsByPricesMiddleware implements NestMiddleware {
    constructor(
        private readonly productsService: ProductsService,
        private readonly categoriesService: CategoriesService
        ){}
    async use(req: Request, res: Response, next: NextFunction) {
        const categoryId = Number(req.query['category-id'])

        if(!isNaN(categoryId)) {
            if(await this.categoriesService.getCategory(categoryId)) {
                if((await this.productsService.getProductsSortedByPriceASC(categoryId)).length) {
                    next()
                } else throw new HttpException('No products exists for the provided category ID', HttpStatus.BAD_REQUEST)
            } else throw new HttpException('The provided category ID does not exists', HttpStatus.BAD_REQUEST)
        } else throw new HttpException('Wrong input', HttpStatus.BAD_REQUEST)
    }
}