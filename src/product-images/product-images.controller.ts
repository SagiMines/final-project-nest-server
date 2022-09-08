import { Controller, Get, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { AreProductImagesGuard } from './auth/are-product-images.guard';
import { ProductImagesService } from './product-images.service';

@Controller('product-images')
export class ProductImagesController {

    constructor( private readonly productImagesService: ProductImagesService) {}

    @Get(':id')
    @UseGuards(AreProductImagesGuard)
    getProductImages(@Param('id', ParseIntPipe) id: number) {
        return this.productImagesService.getImagesByProductId(id)
    }
}
