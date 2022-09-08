import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ProductsService } from '../products.service';

@Injectable()
export class IsProductGuard implements CanActivate {
    constructor(private readonly productsService: ProductsService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const productId = context.switchToHttp().getRequest().params.id
    if(this.productsService.getProduct(Number(productId))) return true
    return false
  }
}