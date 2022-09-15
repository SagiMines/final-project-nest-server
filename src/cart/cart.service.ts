import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, getConnection, Repository, UpdateResult } from 'typeorm';
import { CartDto } from './cart-dto';
import { Cart } from './entities/cart.entity';


@Injectable()
export class CartService {
  constructor(@InjectRepository(Cart) private cartRepo: Repository<Cart>) {}
  
  getCartByUserId(userId: number): Promise<Cart[]> {
    return this.cartRepo.find({where: {userId}})
  }

  addToCart(cart: CartDto): Promise<Cart> {
    return this.cartRepo.save(cart)
  }

  deleteFromCart(userId: number, productId: number): Promise<DeleteResult> {
    return this.cartRepo.delete({userId, productId})
  }

  updateCartItemAmount(userId: number, productId: number, amount: number): Promise<UpdateResult | DeleteResult> {
    if(amount === 0) {
      return this.deleteFromCart(userId, productId)
    }
    return this.cartRepo.update({userId, productId}, {amount})
  }

  getCartByUserAndProductIds(userId: number, productId: number): Promise<Cart> {
    return this.cartRepo.findOne({userId, productId})
  }
}
