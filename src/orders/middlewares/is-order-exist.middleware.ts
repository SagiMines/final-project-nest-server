import { HttpException, HttpStatus, Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { UsersService } from "../../users/users.service";
import { OrdersService } from "../orders.service";

@Injectable()
export class IsOrderExistMiddleware implements NestMiddleware {
    constructor(private readonly ordersService: OrdersService, private readonly usersService: UsersService ){}
    async use(req: Request, res: Response, next: NextFunction) {
        
        const orderId = Number(req.params.id)
        //if the param is numeric
        if(!isNaN(orderId)) {
            //if there are orders for the user id provided in the param
            if((await this.ordersService.getOrdersById(orderId))) {
                next()
            } else throw new HttpException('No order available with this id', HttpStatus.BAD_REQUEST)
        } else throw new HttpException('Wrong input: only numeric values can be entered', HttpStatus.BAD_REQUEST)
    }
    
}