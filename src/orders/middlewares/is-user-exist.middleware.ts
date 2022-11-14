import { HttpException, HttpStatus, Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { UsersService } from "../../users/users.service";
import { OrdersService } from "../orders.service";

@Injectable()
export class IsUserExistMiddleware implements NestMiddleware {
    constructor(private readonly ordersService: OrdersService, private readonly usersService: UsersService ){}
    async use(req: Request, res: Response, next: NextFunction) {
        
        const id = Number(req.params.id)

        // If asked for the  join tables (orders and order_details) by user id
        if(req.query.join) {
            if(!isNaN(id)) {
                if((await this.ordersService.getOrders()).find(order => order.id === id)) {
                    next()
                } else throw new HttpException('The order ID provided does not exist', HttpStatus.BAD_REQUEST)
            } else throw new HttpException('Wrong input', HttpStatus.BAD_REQUEST)
        }
        // Only orders details by user id
        else{
            //if the param is numeric
            if(!isNaN(id)) {
                //if there are orders for the user id provided in the param
                if((await this.ordersService.getOrdersByUserId(id))) {
                    if(!(await this.ordersService.getOrdersByUserId(id)).length) {
                        req.body.empty = true
                    }
                    next()
                    //if there isn't a user with the id provided in the param
                } else if(!(await this.usersService.findById(id))){
                    throw new HttpException('No such user exist', HttpStatus.BAD_REQUEST)
                }
            } else throw new HttpException('Wrong input: only numeric values can be entered', HttpStatus.BAD_REQUEST)
        }
    }
    
}