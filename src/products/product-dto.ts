import { IsNotEmpty, IsNumberString, IsDateString, MaxLength, IsInt } from 'class-validator'

export class ProductDto {

    @IsNotEmpty()
    @IsInt()
    id: number

    @IsNotEmpty()
    @IsInt()
    categoryId: number

    @IsNotEmpty()
    @MaxLength(100)
    productName: string

    @IsNotEmpty()
    @IsNumberString()
    unitPrice: number

    @IsNotEmpty()
    @IsNumberString()
    unitsInStock: number

    @MaxLength(2500)
    description: string

    @IsNumberString()
    discount: number

    @IsDateString()
    publishDate: string
}
