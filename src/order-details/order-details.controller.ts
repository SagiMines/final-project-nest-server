import { Controller, Get, Post, Body, Param, ParseIntPipe } from '@nestjs/common';
import { OrderDetails } from './entities/order-detail.entity';
import { OrderDetailsDto } from './order-details-dto';
import { OrderDetailsService } from './order-details.service';

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
    return this.orderDetailsService.addOrderDetails(newOrderDetail)
  }
}
