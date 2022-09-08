import { HttpException, HttpStatus, Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { CategoriesService } from "../categories.service";
// applies to POST requests in route /orders
@Injectable()
export class IsCategoryMiddleware implements NestMiddleware {
    constructor(private readonly categoriesService: CategoriesService){}
    async use(req: Request, res: Response, next: NextFunction) {
        const id = Number(req.params.id) 
        const isCategory = await this.categoriesService.getCategory(id)
        if(!isCategory) {
            throw new HttpException('No such category', HttpStatus.BAD_REQUEST)
        }
        next()
    } 
}