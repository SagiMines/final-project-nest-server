import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ProductImagesService } from '../product-images.service';

@Injectable()
export class AreProductImagesGuard implements CanActivate {
    constructor(private readonly productImagesService: ProductImagesService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const productId = context.switchToHttp().getRequest().params.id
    const found = this.productImagesService.getImagesByProductId(Number(productId))
    if(found.length > 0) return true
    return false
  }
}