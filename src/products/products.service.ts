import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Response } from 'express';
import { Repository } from 'typeorm';
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

    addProduct(product: ProductDto): Promise<Products> {
        return this.productsRepo.save(product)
    }
}
