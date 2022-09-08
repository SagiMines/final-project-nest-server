import { Controller, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) {}

    @Get()
    //assigned middleware
    getCategories() {
        return this.categoriesService.getCategories()
    }

    @Get(':id')
    //assigned middleware
    getCategorie(@Param('id', ParseIntPipe) id: number) {
        return this.categoriesService.getCategory(id)
    }

    @Post()
    //assigned middleware
    addCategory() {}
}
