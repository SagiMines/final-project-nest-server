import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesModule } from '../categories/categories.module';
import { Products } from './entities/products.entity';
import { AreProductsMiddleware } from './middlewares/are-products.middleware';
import { GetNewestProductsMiddleware } from './middlewares/get-newest-products.middleware';
import { GetProductsByPricesMiddleware } from './middlewares/get-products-by-prices.middleware';
import { IsProductMiddleware } from './middlewares/is-product.middleware';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

@Module({
  imports: [TypeOrmModule.forFeature([Products]), CategoriesModule],
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
    consumer.apply(GetProductsByPricesMiddleware).forRoutes(
      {
        path: 'products/ascending-prices',
        method: RequestMethod.GET
      }
    ),

    consumer.apply(GetProductsByPricesMiddleware).forRoutes(
      {
        path: 'products/descending-prices',
        method: RequestMethod.GET
      }
    ),
    consumer.apply(GetNewestProductsMiddleware).forRoutes(
      {
        path: 'products/newest-products',
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
