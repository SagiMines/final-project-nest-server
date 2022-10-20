import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Products } from './entities/products.entity';
import { ProductDto } from './product-dto';

@Injectable()
export class ProductsService {
    constructor(@InjectRepository(Products) private productsRepo: Repository<Products>) {}
    
    getProducts(): Promise<Products[]> {
        return this.productsRepo.find()
    }
    
    getProduct(id: number): Promise<Products> {
        return this.productsRepo.findOne({id})
    }

    getProductByCategory(categoryId: number): Promise<Products[]> {
        return this.productsRepo.find({ where: {categoryId} })
    }

    addProduct(product: ProductDto): Promise<Products> {
        return this.productsRepo.save(product)
    }

    updateProductAmount(id: number, newAmount: number): Promise<UpdateResult> {
        return this.productsRepo.update({id}, {unitsInStock: newAmount})
    }

    getProductsSortedByPriceASC(categoryId: number): Promise<Products[]> {
        return this.productsRepo.find(
            {
                where:{categoryId},
                order:{unitPrice: 'ASC'}
        })
    }

    getProductsSortedByPriceDESC(categoryId: number): Promise<Products[]> {
        return this.productsRepo.find(
            {
                where:{categoryId},
                order:{unitPrice: 'DESC'}
        })
    }

    getNewestProducts(categoryId: number): Promise<Products[]> {
        return this.productsRepo.find(
            {
                where:{categoryId},
                order:{publishDate: 'DESC'}
            }
        )
    }

    getJoinedProductsAndProductImages(id: number): Promise<Products>  {
        return this.productsRepo.findOne({where: {id}, relations: ['productImages']})
    }
    
}
