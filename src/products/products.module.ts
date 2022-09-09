import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { NestApplication } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from './entities/products.entity';
import { AreProductsMiddleware } from './middlewares/are-products.middleware';
import { IsProductMiddleware } from './middlewares/is-product.middleware';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

@Module({
  imports: [TypeOrmModule.forFeature([Products])],
  controllers: [ProductsController],
  providers: [ProductsService]
})
export class ProductsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AreProductsMiddleware).forRoutes(
      {
        path: 'products',
        method: RequestMethod.GET
      }
    ),
    consumer.apply(IsProductMiddleware).forRoutes(
      {
        path: 'products/:id',
        method: RequestMethod.GET
      }
    )
  }
  

}
