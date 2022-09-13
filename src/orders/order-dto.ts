import { IsNotEmpty, IsNumberString, MaxLength, IsInt, IsOptional, IsDateString } from 'class-validator'

export class OrderDto {
    
    @IsOptional()
    @IsInt()
    @IsNotEmpty()
    id: number

    @IsNotEmpty()
    @IsInt()
    userId: number

    @IsNotEmpty()
    @IsDateString()
    @MaxLength(10)
    orderDate: string

    @IsNotEmpty()
    @MaxLength(100)
    shipAddress: string

    @IsNotEmpty()
    @MaxLength(32)
    shipCountry: string

    @IsNotEmpty()
    @MaxLength(20)
    shipCity: string

    @IsOptional()
    @MaxLength(10)
    @IsNumberString()
    shipPostalCode: string
}