import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { CategoriesModule } from './categories/categories.module';
import { ProductImagesModule } from './product-images/product-images.module';
import { AddUserMiddleware } from './middlewares/add-user.middleware';
import { TopProductsModule } from './top-products/top-products.module';
import { WishlistModule } from './wishlist/wishlist.module';
import { OrdersModule } from './orders/orders.module';
import { OrderDetailsModule } from './order-details/order-details.module';
import * as dotenv from 'dotenv'
import { IsUserExistMiddleware } from './middlewares/is-user-connected.middleware';
import { CartModule } from './cart/cart.module';
import { LogOutUserMiddleware } from './middlewares/log-out-user.middleware';
import { VerifyMailMiddleware } from './middlewares/verify-mail.middleware';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
dotenv.config()
@Module({
  imports: [
     ConfigModule.forRoot({
    isGlobal: true
  }), ProductsModule, UsersModule, CategoriesModule, ProductImagesModule, TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'eu-cdbr-west-03.cleardb.net',
    port: 3306,
    username: 'bed0fe8e517d5e',
    password: '5be17ca2',
    database: 'heroku_77e2ea182822fce',
    entities: ['dist/**/*.entity{.ts,.js}'],
    synchronize: false
  }), TopProductsModule, WishlistModule, OrdersModule, OrderDetailsModule, CartModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AddUserMiddleware).forRoutes(
      {
        path:'/register',
        method: RequestMethod.POST
      }
    ),
    consumer.apply(IsUserExistMiddleware).forRoutes(
      {
        path:'/login/:encryptedUserId',
        method: RequestMethod.GET
      }
    ),
    consumer.apply(LogOutUserMiddleware).forRoutes(
      {
        path:'/logout',
        method: RequestMethod.POST
      }
    ),
    consumer.apply(VerifyMailMiddleware).forRoutes(
      {
        path:'/register',
        method: RequestMethod.GET
      }
    )
  }
}
