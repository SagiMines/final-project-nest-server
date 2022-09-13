import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { WishlistController } from './wishlist.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wishlist } from './entities/wishlist.entity';
import { AreListsMiddleware } from './middlewares/are-lists.middleware';
import { IsListMiddleware } from './middlewares/is-list.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([Wishlist])],
  controllers: [WishlistController],
  providers: [WishlistService]
})
export class WishlistModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AreListsMiddleware).forRoutes(
      {
        path: 'wishlist',
        method: RequestMethod.GET
      }
    ),
    consumer.apply(IsListMiddleware).forRoutes(
      {
        path: 'wishlist',
        method: RequestMethod.DELETE
      }
    )
  }
}
