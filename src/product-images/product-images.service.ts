import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductImages } from './entities/product-images.entity';
import { ProductImagesDto } from './product-images-dto';

@Injectable()
export class ProductImagesService {
    constructor(@InjectRepository(ProductImages) private productImagesRepo: Repository<ProductImages>) {}

    getProductImages(): Promise<ProductImages[]> {
        return this.productImagesRepo.find()
    }

    getImagesByProductId(id: number): Promise<ProductImages[]> {
        return this.productImagesRepo.find({ where: {productId: id} })
    }

    addProductImage(productImage: ProductImagesDto): Promise<ProductImages> {
        return this.productImagesRepo.save(productImage)
    }
}
