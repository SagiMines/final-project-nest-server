import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { UsersModule } from '../users/users.module';
import { IsUserExistMiddleware } from './middlewares/is-user-exist.middleware';
import { UpdateCartItemMiddleware } from './middlewares/update-cart-item.middleware';
import { DeleteCartItemMiddleware } from './middlewares/delete-cart-item.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([Cart]), UsersModule],
  controllers: [CartController],
  providers: [CartService]
})
export class CartModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(IsUserExistMiddleware).forRoutes(
      {
        path: 'cart/:id',
        method: RequestMethod.GET
      }
    ),
    consumer.apply(UpdateCartItemMiddleware).forRoutes(
      {
        path: 'cart',
        method: RequestMethod.PATCH
      }
    ),
    consumer.apply(DeleteCartItemMiddleware).forRoutes(
      {
        path: 'cart',
        method: RequestMethod.DELETE
      }
    )
  }
}
