import { HttpException, HttpStatus, Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { UsersService } from "../../users/users.service";
import { OrdersService } from "../orders.service";

@Injectable()
export class IsUserExistMiddleware implements NestMiddleware {
    constructor(private readonly ordersService: OrdersService, private readonly usersService: UsersService ){}
    async use(req: Request, res: Response, next: NextFunction) {
        
        const userId = Number(req.params.id)

        //if the param is numeric
        if(!isNaN(userId)) {
            //if there are orders for the user id provided in the param
            if((await this.ordersService.getOrdersByUserId(userId)).length) {
                next()
                //if there isn't a user with the id provided in the param
            } else if(!(await this.usersService.findById(userId))){
                throw new HttpException('No such user exist', HttpStatus.BAD_REQUEST)
            } else  throw new HttpException('No orders available for the requested user', HttpStatus.BAD_REQUEST)
        } else throw new HttpException('Wrong input: only numeric values can be entered', HttpStatus.BAD_REQUEST)
    }
    
}