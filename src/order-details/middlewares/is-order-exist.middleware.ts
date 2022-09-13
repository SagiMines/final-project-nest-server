import { HttpException, HttpStatus, Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { OrdersService } from "../../orders/orders.service";

@Injectable()
export class IsOrderExistMiddleware implements NestMiddleware {
    constructor(private readonly ordersService: OrdersService ){}
    async use(req: Request, res: Response, next: NextFunction) {
        
        const orderId = Number(req.params.id)

        //if the param is numeric
        if(!isNaN(orderId)) {
            //if there is an existing order with the id in the param
            if(await this.ordersService.getOrdersById(orderId)) {
                next()
            } else throw new HttpException('No order available with this id', HttpStatus.BAD_REQUEST)
        } else throw new HttpException('Wrong input: only numeric values can be entered', HttpStatus.BAD_REQUEST)
    }
    
}