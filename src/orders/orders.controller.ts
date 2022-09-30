import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, HttpException, HttpStatus } from '@nestjs/common';
import { Orders } from './entities/order.entity';
import { OrderDto } from './order-dto';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  addNewOrder(@Body() newOrder: OrderDto): Promise<Orders> {
    this.ordersService.addNewOrder(newOrder)
    throw new HttpException('Added successfully to the database', HttpStatus.OK)
  }

  @Get()
  // assigned middleware
  getOrders(): Promise<Orders[]>  {
    return this.ordersService.getOrders()
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
