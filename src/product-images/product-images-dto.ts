import { IsNotEmpty, MaxLength, IsInt, IsOptional } from 'class-validator'


export class ProductImagesDto {

    @IsOptional()
    @IsNotEmpty()
    @IsInt()
    id: number

    @IsNotEmpty()
    @IsInt()
    productId: number

    @IsNotEmpty()
    @MaxLength(1000)
    imageSrc: string
}
