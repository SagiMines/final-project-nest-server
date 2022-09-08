import { HttpException, HttpStatus, Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { CategoriesService } from "../categories.service";
// applies to POST requests in route /orders
@Injectable()
export class AreCategoriesMiddleware implements NestMiddleware {
    constructor(private readonly categoriesService: CategoriesService){}
    async use(req: Request, res: Response, next: NextFunction) {
        const areCategories = (await this.categoriesService.getCategories()).length !== 0
        if(!areCategories) {
            throw new HttpException('No categories available', HttpStatus.BAD_REQUEST)
        }
        next()
    }
    
}