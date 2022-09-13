import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderDetails } from './entities/order-detail.entity';
import { OrderDetailsDto } from './order-details-dto';

@Injectable()
export class OrderDetailsService {
  constructor(@InjectRepository(OrderDetails) private orderDetailsRepo: Repository<OrderDetails>) {}
  
  getOrderDetailsByOrderId(orderId: number): Promise<OrderDetails[]> {
    return this.orderDetailsRepo.find({where: {orderId}})
  }

  addOrderDetails(newOrderDetails: OrderDetailsDto): Promise<OrderDetails> {
    return this.orderDetailsRepo.save(newOrderDetails)
  }
  
}