import { Body, Controller, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { ProductImagesDto } from './product-images-dto';
import { ProductImagesService } from './product-images.service';

@Controller('product-images')
export class ProductImagesController {
    constructor( private readonly productImagesService: ProductImagesService) {}

    @Get()
    // assigned middleware
    getProductImages() {
        return this.productImagesService.getProductImages()
    }


    @Get(':id')
    // assigned middleware
    getProductImagesById(@Param('id', ParseIntPipe) id: number) {
        return this.productImagesService.getImagesByProductId(id)
    }

    @Post()
    addProductImage(@Body() productImage: ProductImagesDto) {
        return this.productImagesService.addProductImage(productImage)
    }
}
