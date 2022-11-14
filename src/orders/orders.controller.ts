import { Query, Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, HttpException, HttpStatus, ParseBoolPipe, Req } from '@nestjs/common';
// import { Query } from 'typeorm/driver/Query';
import { Orders } from './entities/order.entity';
import { OrderDto } from './order-dto';
import { OrdersService } from './orders.service';
import { Request } from 'express';
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
  getOrdersByUserId(@Param('id', ParseIntPipe) id: number, @Query('join') join: boolean, @Req() req: Request): Promise<Orders[] | Orders>  {
    if(join && !req.body.empty) {
      return this.ordersService.getJoinedOrdersAndOrderDetails(id)
    }
    return this.ordersService.getOrdersByUserId(id)
  }
  
  @Delete(':id')
  // assigned middleware
  removeOrderById(@Param('id', ParseIntPipe) id: number) {
    return this.ordersService.removeOrderById(id)
  }

}
