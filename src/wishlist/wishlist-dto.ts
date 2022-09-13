import { IsNotEmpty, IsInt } from 'class-validator'

export class WishlistDto {

    @IsNotEmpty()
    @IsInt()
    userId: number

    @IsNotEmpty()
    @IsInt()
    productId: number

}