import { Controller, Get, Post, Body, Param, ParseIntPipe, HttpException, HttpStatus, Req } from '@nestjs/common';
import { OrderDetails } from './entities/order-detail.entity';
import { OrderDetailsDto } from './order-details-dto';
import { OrderDto } from './../orders/order-dto';
import { OrderDetailsService } from './order-details.service';
import { sendOrderConfirmationViaEmail } from './../mailer/nodeMailer';
import { Request } from 'express';

@Controller('order-details')
export class OrderDetailsController {
  constructor(private readonly orderDetailsService: OrderDetailsService) {}

  @Get(':id')
  //assigned middleware
  getOrderDetailsByOrderId(@Param('id', ParseIntPipe) orderId: number): Promise<OrderDetails[]> {
    return this.orderDetailsService.getOrderDetailsByOrderId(orderId)
  }

  
  @Post()
  addOrderDetails(@Body() newOrderDetail: OrderDetailsDto): Promise<OrderDetails> {
    this.orderDetailsService.addOrderDetails(newOrderDetail)
    throw new HttpException('Added successfully to the database', HttpStatus.OK)
  }


  @Post('order-confirmation')
  //assigned middleware
  sendOrderConfirmation() {
    throw new HttpException('Email was successfully sent', HttpStatus.OK)
  }
}
