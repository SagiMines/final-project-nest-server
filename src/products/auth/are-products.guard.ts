import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ProductsService } from '../products.service';

@Injectable()
export class AreProductsGuard implements CanActivate {
    constructor(private readonly productsService: ProductsService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isProducts = this.productsService.getProducts().length > 0
    return isProducts
  }
}