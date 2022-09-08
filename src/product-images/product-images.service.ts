import { Injectable } from '@nestjs/common';
import { ProductImagesDto } from './product-images-dto';

@Injectable()
export class ProductImagesService {

    private _productImages: ProductImagesDto[] = [
        {
            id: 1,
            productId: 1,
            imageSrc: 'https://www.milwaukeetool.com/-/media/Products/Power-Tools/Cordless/Drills/2804-20_1.png?mh=520&mw=520&hash=AE3622694F0579295DE37C1F4BC89010'
        }
    ]

    getImagesByProductId(id: number): ProductImagesDto[] {
        const productImages = this._productImages.filter(image => image.productId === id)
        return productImages
    }
}
