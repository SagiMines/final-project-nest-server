import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Not, Repository, UpdateResult } from 'typeorm';
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
        return this.productsRepo
        .createQueryBuilder('products')
        .select(['products.id AS id','products.categoryId AS categoryId','products.productName AS productName','products.unitPrice AS unitPrice','products.unitsInStock AS unitsInStock','products.description AS description','products.discount AS discount','products.publishDate AS publishDate','(products.unitPrice - (products.unitPrice * (IFNULL(products.discount, 0) * 0.01))) AS discountedPrice'])
        .where('products.categoryId = :categoryId', {categoryId})
        .orderBy('9', 'ASC')
        .getRawMany()
    }

    getProductsSortedByPriceDESC(categoryId: number): Promise<Products[]> {
        return this.productsRepo
        .createQueryBuilder('products')
        .select(['products.id AS id','products.categoryId AS categoryId','products.productName AS productName','products.unitPrice AS unitPrice','products.unitsInStock AS unitsInStock','products.description AS description','products.discount AS discount','products.publishDate AS publishDate','(products.unitPrice - (products.unitPrice * (IFNULL(products.discount, 0) * 0.01))) AS discountedPrice'])
        .where('products.categoryId = :categoryId', {categoryId})
        .orderBy('9', 'DESC')
        .getRawMany()
    }

    getSearchValues(value: string): Promise<Products[]> {
        return this.productsRepo.find(
            {
                where:{productName: Like(`%${value}%`)},
                relations: ['productImages']
            }
        )
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
