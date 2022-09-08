import { Controller, Get, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { AreProductsGuard } from './auth/are-products.guard';
import { IsProductGuard } from './auth/is-product.guard';
import { ProductDto } from './product-dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}
    
    @Get()
    @UseGuards(AreProductsGuard)
    getProducts(): ProductDto[]{
        return this.productsService.getProducts()
    }

    @Get(':id')
    @UseGuards(IsProductGuard)
    getProduct(@Param('id', ParseIntPipe) id: number): ProductDto{
        return this.productsService.getProduct(id)
    }
}
