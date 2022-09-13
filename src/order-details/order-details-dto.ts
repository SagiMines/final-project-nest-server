import { IsInt, IsNotEmpty, IsNumberString, Max, Min } from "class-validator";


export class OrderDetailsDto {
    
    @IsNotEmpty()
    @IsInt()
    orderId: number

    @IsNotEmpty()
    @IsInt()
    productId: number

    @IsNotEmpty()
    @IsNumberString()
    unitPrice: number

    @IsNotEmpty()
    @IsInt()
    @Max(255)
    @Min(0)
    amount: number

    @IsNotEmpty()
    @IsNumberString()
    finalPrice: number

}   

