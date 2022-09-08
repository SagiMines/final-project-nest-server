import { Injectable } from '@nestjs/common';
import { CategoryDto } from './category-dto';

@Injectable()
export class CategoriesService {
    private _categories: CategoryDto[] = [
        {
            id: 1,
            categoryName: 'Drills'
        },
        {
            id: 2,
            categoryName: 'Impact Drivers'
        },
    ]

    getCategories(): CategoryDto[] {
        return this._categories
    }

    getCategory(id: number): CategoryDto {
        const found = this._categories.find(category => category.id === id)
        return found
    }
}
