import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Wishlist } from './entities/wishlist.entity';
import { WishlistDto } from './wishlist-dto';

@Injectable()
export class WishlistService {
  constructor(@InjectRepository(Wishlist) private wishlistRepo: Repository<Wishlist>) {}
  

  getListsByUserId(userId: number): Promise<Wishlist[]> {
    return this.wishlistRepo.find({userId})
  }
  getList(userId: number, productId: number): Promise<Wishlist> {
    return this.wishlistRepo.findOne({userId, productId})
  }

  addList(list: WishlistDto): Promise<Wishlist> {
    return this.wishlistRepo.save(list)
  }
  
  removeList(userId: number, productId: number) {
    return this.wishlistRepo.delete({userId, productId})
  }
}
