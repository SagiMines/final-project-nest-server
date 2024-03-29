import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
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
import * as dotenv from 'dotenv';
import { IsUserExistMiddleware } from './middlewares/is-user-connected.middleware';
import { CartModule } from './cart/cart.module';
import { LogOutUserMiddleware } from './middlewares/log-out-user.middleware';
import { VerifyMailMiddleware } from './middlewares/verify-mail.middleware';
import { GetUserMessageMiddleware } from './middlewares/get-user-message.middleware';
dotenv.config();
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ProductsModule,
    UsersModule,
    CategoriesModule,
    ProductImagesModule,
    TypeOrmModule.forRoot({
      type: process.env.TYPE,
      host: process.env.HOST,
      port: 3306,
      username: process.env.USER,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: false,
    }),
    TopProductsModule,
    WishlistModule,
    OrdersModule,
    OrderDetailsModule,
    CartModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AddUserMiddleware).forRoutes({
      path: '/register',
      method: RequestMethod.POST,
    }),
      consumer.apply(IsUserExistMiddleware).forRoutes({
        path: '/login/:encryptedUserId',
        method: RequestMethod.GET,
      }),
      consumer.apply(LogOutUserMiddleware).forRoutes({
        path: '/logout',
        method: RequestMethod.POST,
      }),
      consumer.apply(VerifyMailMiddleware).forRoutes({
        path: '/register',
        method: RequestMethod.GET,
      }),
      consumer.apply(GetUserMessageMiddleware).forRoutes({
        path: '/contact-us',
        method: RequestMethod.POST,
      });
  }
}
