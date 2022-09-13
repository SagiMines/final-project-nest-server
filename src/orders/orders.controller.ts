import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { Orders } from './entities/order.entity';
import { OrderDto } from './order-dto';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  addNewOrder(@Body() newOrder: OrderDto): Promise<Orders> {
    return this.ordersService.addNewOrder(newOrder)
  }
  
  @Get(':id')
  // assigned middleware
  getOrdersByUserId(@Param('id', ParseIntPipe) id: number): Promise<Orders[]>  {
    return this.ordersService.getOrdersByUserId(id)
  }
  
  @Delete(':id')
  // assigned middleware
  removeOrderById(@Param('id', ParseIntPipe) id: number) {
    return this.ordersService.removeOrderById(id)
  }

}
