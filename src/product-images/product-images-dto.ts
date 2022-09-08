import { IsNotEmpty, MaxLength, IsInt } from 'class-validator'


export class ProductImagesDto {

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
