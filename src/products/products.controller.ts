import { Body, Controller, Get, HttpException, HttpStatus, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { UpdateResult } from 'typeorm';
import { Products } from './entities/products.entity';
import { ProductDto } from './product-dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}
    
    @Get()
    // assigned middleware
    getProducts(@Query('category-id') categoryId: number): Promise<Products[]>{
        if(categoryId) {
            return this.productsService.getProductByCategory(categoryId)
        }
        return this.productsService.getProducts()
    }
    
    @Get('ascending-prices')
    // assigned middleware
    getProductsByPricesASC(@Query('category-id') categoryId: number): Promise<Products[]>{
        return this.productsService.getProductsSortedByPriceASC(categoryId)
    }

    @Get('descending-prices')
    // assigned middleware
    getProductsByPricesDESC(@Query('category-id') categoryId: number): Promise<Products[]>{
        return this.productsService.getProductsSortedByPriceDESC(categoryId)
    }

    @Get('newest-products')
    // assigned middleware
    getNewestProducts(@Query('category-id') categoryId: number): Promise<Products[]>{
        return this.productsService.getNewestProducts(categoryId)
    }
    
    @Get(':id')
    // assigned middleware
    getProduct(@Param('id', ParseIntPipe) id: number): Promise<Products>{
        return this.productsService.getProduct(id)
    }
    
    
    @Post()
    addProduct(@Body() product: ProductDto): Promise<Products> {
        return this.productsService.addProduct(product)
    }
    
    @Patch()
    // assigned middleware
    updateProductAmount(
        @Query('product-id', ParseIntPipe) productId: number,
        @Query('amount', ParseIntPipe) amount: number ): Promise<UpdateResult> {
            this.productsService.updateProductAmount(productId, amount)
            throw new HttpException('Successfully updated from the database', HttpStatus.OK)
        }
    }
