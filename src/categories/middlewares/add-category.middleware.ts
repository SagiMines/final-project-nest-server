import { HttpException, HttpStatus, Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { CategoriesService } from "../categories.service";
// applies to POST requests in route /orders
@Injectable()
export class AddCategoryMiddleware implements NestMiddleware {
    constructor(private readonly categoriesService: CategoriesService){}
    async use(req: Request, res: Response, next: NextFunction) {
        const category = req.body
        
        if(!req.body.categoryName) {
            throw new HttpException("Invalid input" ,HttpStatus.BAD_REQUEST)
        }
        this.categoriesService.addCategory(category)
        next()
    }
    
}