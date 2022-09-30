import { HttpException, HttpStatus, Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { UsersService } from "../../users/users.service";
import { OrdersService } from "../orders.service";

@Injectable()
export class AreOrdersExistsMiddleware implements NestMiddleware {
    constructor(private readonly ordersService: OrdersService, private readonly usersService: UsersService ){}
    async use(req: Request, res: Response, next: NextFunction) {
        
            //if there are orders
            if((await this.ordersService.getOrders()).length) {
                next()
            } else throw new HttpException('No orders available', HttpStatus.BAD_REQUEST)
}
}