import { Controller, Get, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { AreCategoriesGuard } from './auth/are-categories.guard';
import { IsCategoryGuard } from './auth/is-category.guard';
import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) {}

    @Get()
    @UseGuards(AreCategoriesGuard)
    getCategories() {
        return this.categoriesService.getCategories()
    }

    @Get(':id')
    @UseGuards(IsCategoryGuard)
    getCategorie(@Param('id', ParseIntPipe) id: number) {
        return this.categoriesService.getCategory(id)
    }
}
