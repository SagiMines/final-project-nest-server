import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { NestApplication } from '@nestjs/core';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

@Module({
  imports: [],
  controllers: [ProductsController],
  providers: [ProductsService]
})
export class ProductsModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(GetProductsMiddleware).forRoutes(
  //     {
  //       path: 'products',
  //       method: RequestMethod.GET
  //     }
  //   )
  // }
  

}
