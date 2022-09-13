import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Orders } from './entities/order.entity';
import { IsUserExistMiddleware } from './middlewares/is-user-exist.middleware';
import { UsersModule } from '../users/users.module';
import { IsOrderExistMiddleware } from './middlewares/is-order-exist.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([Orders]), UsersModule],
  controllers: [OrdersController],
  providers: [OrdersService],
  exports: [OrdersService]
})
export class OrdersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(IsUserExistMiddleware).forRoutes(
      {
        path: 'orders/:id',
        method: RequestMethod.GET
      }
    ),
    consumer.apply(IsOrderExistMiddleware).forRoutes(
      {
        path: 'orders/:id',
        method: RequestMethod.DELETE
      }
    )
  }
}
