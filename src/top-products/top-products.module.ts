import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TopProductsService } from './top-products.service';
import { TopProductsController } from './top-products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TopProducts } from './entities/top-product.entity';
import { AreTopProductsMiddleware } from './middlewares/are-top-products.middleware';
import { IsTopProductMiddleware } from './middlewares/is-top-product.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([TopProducts])],
  controllers: [TopProductsController],
  providers: [TopProductsService]
})
export class TopProductsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AreTopProductsMiddleware).forRoutes(
      {
        path: 'top-products',
        method: RequestMethod.GET
      }
    ),
    consumer.apply(IsTopProductMiddleware).forRoutes(
      {
        path: 'top-products/:id',
        method: RequestMethod.DELETE
      }
    )
  }
}
