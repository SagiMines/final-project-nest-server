import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { CategoriesService } from '../categories.service';

@Injectable()
export class IsCategoryGuard implements CanActivate {
    constructor(private readonly categoriesService: CategoriesService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const categoryId = context.switchToHttp().getRequest().params.id
    if(this.categoriesService.getCategory(Number(categoryId))) return true
    return false
  }
}