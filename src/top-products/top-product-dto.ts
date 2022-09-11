import { IsNotEmpty, IsInt, IsOptional } from 'class-validator'

export class TopProductDto {

    @IsOptional()
    @IsNotEmpty()
    @IsInt()
    id: number

    @IsNotEmpty()
    @IsInt()
    productId: number

}