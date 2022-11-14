import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { OrderDetailsService } from './order-details.service';
import { OrderDetailsController } from './order-details.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderDetails } from './entities/order-detail.entity';
import { OrdersModule } from '../orders/orders.module';
import { IsOrderExistMiddleware } from './middlewares/is-order-exist.middleware';
import { SendOrderConfirmationViaEmailMiddleware } from './middlewares/send-order-confirmation-via-email.middleware';
import { UsersModule } from './../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([OrderDetails]), OrdersModule, UsersModule],
  controllers: [OrderDetailsController],
  providers: [OrderDetailsService]
})
export class OrderDetailsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(IsOrderExistMiddleware).forRoutes(
      {
        path: 'order-details/:id',
        method: RequestMethod.GET
      }
    ),
    consumer.apply(SendOrderConfirmationViaEmailMiddleware).forRoutes(
      {
        path: 'order-details/order-confirmation',
        method: RequestMethod.POST
      }
    )
  }
}
