import { HttpException, HttpStatus, Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { UsersService } from "./../../users/users.service";
import { OrdersService } from "../../orders/orders.service";
import { sendOrderConfirmationViaEmail } from "./../../mailer/nodeMailer";

@Injectable()
export class SendOrderConfirmationViaEmailMiddleware implements NestMiddleware {
    constructor(private readonly ordersService: OrdersService, private readonly usersService: UsersService ){}
    async use(req: Request, res: Response, next: NextFunction) {
        const reqBody = req.body
        let userEmail : string
        const user = reqBody.user
        const cartProducts = reqBody.cartProducts
        const orderDate = reqBody.orderDate
        const orderId = reqBody.orderId
        const cartTotalWithoutDiscount = reqBody.cartTotalWithoutDiscount
        const cartTotalWithDiscount = reqBody.cartTotalWithDiscount
        const saving = reqBody.saving
        
        if(reqBody.user)  {
            userEmail = reqBody.user.email
        } else {
            throw new HttpException('Failed to retrieve data', HttpStatus.BAD_REQUEST)
        }

        
        sendOrderConfirmationViaEmail(userEmail, user, cartProducts, orderDate, orderId, cartTotalWithoutDiscount, cartTotalWithDiscount, saving, `Thanks for your order!`)
        next()
    }
    
}