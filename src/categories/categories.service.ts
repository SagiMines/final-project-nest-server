import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryDto } from './category-dto';
import { Categories } from './entities/categories.entity';

@Injectable()
export class CategoriesService {
    constructor(@InjectRepository(Categories) private categoriesRepo: Repository<Categories>) {}

    getCategories(): Promise<Categories[]> {
        return this.categoriesRepo.find();
    }

    getCategory(id: number): Promise<Categories> {
        return this.categoriesRepo.findOne({id});
    }

    addCategory(newCategory: CategoryDto): Promise<Categories> {
        return this.categoriesRepo.save(newCategory)
    }


}

