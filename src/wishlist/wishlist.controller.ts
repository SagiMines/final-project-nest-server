import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe, HttpException, HttpCode, HttpStatus } from '@nestjs/common';
import { Wishlist } from './entities/wishlist.entity';
import { WishlistDto } from './wishlist-dto';
import { WishlistService } from './wishlist.service';

@Controller('wishlist')
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @Post()
  create(@Body() list: WishlistDto): Promise<Wishlist> {
    this.wishlistService.addList(list)
    throw new HttpException('Added to the database', HttpStatus.OK)
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
