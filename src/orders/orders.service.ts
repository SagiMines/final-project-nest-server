import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { threadId } from 'worker_threads';
import { Orders } from './entities/order.entity';
import { OrderDto } from './order-dto';

@Injectable()
export class OrdersService {
  constructor(@InjectRepository(Orders) private ordersRepo: Repository<Orders>) {}
  
  getOrders(): Promise<Orders[]> {
    return this.ordersRepo.find()
  }

  addNewOrder(newOrder: OrderDto): Promise<Orders> {
    return this.ordersRepo.save(newOrder)
  }

  getOrdersByUserId(userId: number): Promise<Orders[]> {
    return this.ordersRepo.find({ where: {userId} })
  }

  getOrdersById(id: number): Promise<Orders> {
    return this.ordersRepo.findOne({id})
  }
  
  removeOrderById(id: number) {
    return this.ordersRepo.delete({id})
  }

  getJoinedOrdersAndOrderDetails(id: number) {
    return this.ordersRepo.findOne({where: {id}, relations: ['orderDetails']})
  }
  
  getOnlyFiveOrLessOrders(userId: number, skip: number, take: number ) {
    return this.ordersRepo.find({where: {userId}, order: {id: 'DESC'}, take, skip})
  }

  countTheOrders(userId: number) {
    return this.ordersRepo.count({where:{userId}})
  }

  // create(createOrderDto: CreateOrderDto) {
  //   return 'This action adds a new order';
  // }

  // findAll() {
  //   return `This action returns all orders`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} order`;
  // }

  // update(id: number, updateOrderDto: UpdateOrderDto) {
  //   return `This action updates a #${id} order`;
  // }

}
