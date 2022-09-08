import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categories } from './entities/categories.entity';
import { AreCategoriesMiddleware } from './middlewares/are-categories.middleware';
import { IsCategoryMiddleware } from './middlewares/is-category.middleware';
import { AddCategoryMiddleware } from './middlewares/add-category.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([Categories])],
  providers: [CategoriesService],
  controllers: [CategoriesController]
})
export class CategoriesModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
      consumer.apply(AreCategoriesMiddleware).forRoutes(
        {
          path:'/categories',
          method: RequestMethod.GET
        }
      ),
      consumer.apply(IsCategoryMiddleware).forRoutes(
        {
          path:'/categories/:id',
          method: RequestMethod.GET
        }
      ),
      consumer.apply(AddCategoryMiddleware).forRoutes(
        {
          path:'/categories/',
          method: RequestMethod.POST
        }
      )



      
  }

}
