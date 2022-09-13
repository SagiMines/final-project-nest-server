import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { Wishlist } from './entities/wishlist.entity';
import { WishlistDto } from './wishlist-dto';
import { WishlistService } from './wishlist.service';

@Controller('wishlist')
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @Post()
  create(@Body() list: WishlistDto): Promise<Wishlist> {
    return this.wishlistService.addList(list)
  }

  @Get()
  // assigned middleware
  getListsByUserId(@Query('user-id', ParseIntPipe) userId: number): Promise<Wishlist[]> {
    return this.wishlistService.getListsByUserId(userId)
  }

  @Delete()
  // assigned middleware
  removeList(
      @Query('user-id', ParseIntPipe) userId: number,
      @Query('product-id', ParseIntPipe) productId: number) 
      {
    return this.wishlistService.removeList(userId, productId)
  }
  
}
