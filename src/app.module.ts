import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { CategoriesModule } from './categories/categories.module';
import { ProductImagesModule } from './product-images/product-images.module';
import { Users } from './users/entities/users.entity';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true
  }), ProductsModule, UsersModule, CategoriesModule, ProductImagesModule, TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'sagi1990',
    database: 'workshopdb_copy',
    entities: ['dist/**/*.entity{.ts,.js}'],
    synchronize: false
  }),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
