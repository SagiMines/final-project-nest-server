import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductImages } from './entities/product-images.entity';
import { AreProductImagesMiddleware } from './middlewares/are-product-images.middleware';
import { IsProductImagesMiddleware } from './middlewares/is-product-images.middleware';
import { ProductImagesController } from './product-images.controller';
import { ProductImagesService } from './product-images.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductImages])],
  controllers: [ProductImagesController],
  providers: [ProductImagesService]
})
export class ProductImagesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(IsProductImagesMiddleware).forRoutes(
      {
        path: 'product-images/:id',
        method: RequestMethod.GET
      }
    ),
    consumer.apply(AreProductImagesMiddleware).forRoutes(
      {
        path: 'product-images',
        method: RequestMethod.GET
      }
    )
  }
  
}
