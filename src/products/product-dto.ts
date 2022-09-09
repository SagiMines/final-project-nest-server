import { IsNotEmpty, IsNumberString, IsDateString, MaxLength, IsInt, IsOptional, Max, Min } from 'class-validator'

export class ProductDto {

    @IsOptional()
    @IsNotEmpty()
    @IsInt()
    id: number

    @IsNotEmpty()
    @IsInt()
    categoryId: number

    @IsNotEmpty()
    @MaxLength(100)
    productName: string

    @IsOptional()
    @IsNotEmpty()
    @IsNumberString()
    unitPrice: number

    @IsOptional()
    @IsNotEmpty()
    @IsInt()
    unitsInStock: number

    @IsOptional()
    @MaxLength(2500)
    description: string

    @IsOptional()
    @Max(100)
    @Min(1)
    @IsNumberString()
    discount: number

    @IsOptional()
    @IsDateString()
    publishDate: string
}
