import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { CategoriesModule } from './categories/categories.module';
import { ProductImagesModule } from './product-images/product-images.module';
import { Users } from './users/entities/users.entity';
import { AddUserMiddleware } from './middlewares/add-user.middleware';
import { ProductImagesService } from './product-images/product-images.service';
import { TopProductsModule } from './top-products/top-products.module';
import { WishlistModule } from './wishlist/wishlist.module';
import { OrdersModule } from './orders/orders.module';
import { OrderDetailsModule } from './order-details/order-details.module';
import * as dotenv from 'dotenv'
dotenv.config()
@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true
  }), ProductsModule, UsersModule, CategoriesModule, ProductImagesModule, TypeOrmModule.forRoot({
    type: 'mysql',
    host: process.env.HOST,
    port: 3306,
    username: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    entities: ['dist/**/*.entity{.ts,.js}'],
    synchronize: false
  }), TopProductsModule, WishlistModule, OrdersModule, OrderDetailsModule,],
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
    )
  }
}
