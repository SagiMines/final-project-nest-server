import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query, HttpException, HttpStatus } from '@nestjs/common';
import { DeleteResult, UpdateResult } from 'typeorm';
import { CartDto } from './cart-dto';
import { CartService } from './cart.service';
import { Cart } from './entities/cart.entity';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  addNewCartItem(@Body() newCartItem: CartDto): Promise<Cart> {
    this.cartService.addToCart(newCartItem)
    throw new HttpException('Added to the database', HttpStatus.OK)
  }

  @Get(':id')
  // assigned middleware
  getCartByUserId(@Param('id', ParseIntPipe) id: number): Promise<Cart[]> {
    return this.cartService.getCartByUserId(id)
  }

  @Patch()
  // assigned middleware
  updateCartItem(
    @Query('user-id', ParseIntPipe) userId: number,
    @Query('product-id', ParseIntPipe) productId: number,
    @Query('amount', ParseIntPipe) amount: number): Promise<UpdateResult | DeleteResult> {
    this.cartService.updateCartItemAmount(userId, productId, amount)
    throw new HttpException('Deleted successfully from the database', HttpStatus.OK)
  }

  @Delete()
  // assigned middleware
  deleteCartItem(
    @Query('user-id', ParseIntPipe) userId: number,
    @Query('product-id', ParseIntPipe) productId: number
  ): Promise<DeleteResult> {
    this.cartService.deleteFromCart(userId, productId)
    throw new HttpException('Deleted successfully from the database', HttpStatus.OK)
  }
}
