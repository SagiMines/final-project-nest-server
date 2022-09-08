import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { CategoriesService } from '../categories.service';

@Injectable()
export class AreCategoriesGuard implements CanActivate {
    constructor(private readonly categoriesService: CategoriesService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isProducts = this.categoriesService.getCategories().length > 0
    return isProducts
  }
}