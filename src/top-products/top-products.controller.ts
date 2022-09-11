import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { TopProducts } from './entities/top-product.entity';
import { TopProductDto } from './top-product-dto';
import { TopProductsService } from './top-products.service';

@Controller('top-products')
export class TopProductsController {
  constructor(private readonly topProductsService: TopProductsService) {}

  @Get()
  // assigned middleware
  getTopProducts(): Promise<TopProducts[]> {
    return this.topProductsService.getTopProducts()
  }

  @Post()
  addTopProduct(@Body() topProduct: TopProductDto): Promise<TopProducts>{
    return this.topProductsService.addTopProduct(topProduct)
  }

  @Delete(':id')
  // assigned middleware
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.topProductsService.removeTopProduct(id)
  }
  
}
