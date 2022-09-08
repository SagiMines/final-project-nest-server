import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { ProductDto } from './product-dto';

@Injectable()
export class ProductsService {
   
    private _products: ProductDto[] = [
        {
            id: 1,
            categoryId: 2,
            productName: 'DeWalt DCD999 Hammer Drill', 
            unitPrice: 250, 
            unitsInStock:15, 
            description: 'Take advantage of more power with the 20V MAX* brushless tools with DEWALT® FLEXVOLT ADVANTAGE™ tool technology. This 1/2 in. Cordless Hammer Drill has up to 42% more power when paired with a DCB606 FLEXVOLT® Battery vs. a DCB205 20V MAX* 5.0Ah Battery. Battery and charger sold separately.', 
            discount: null, 
            publishDate: '2021-07-07'
        }
    ]

    getProducts(): ProductDto[] {
        return this._products
    }
    
    getProduct(id: number): ProductDto {
        const found = this._products.find(product => product.id === id)
        return found
    }
}
