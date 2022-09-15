import { IsInt, IsNotEmpty, Max, Min } from "class-validator";

export class CartDto {
    @IsInt()
    @IsNotEmpty()
    userId: number

    @IsInt()
    @IsNotEmpty()
    productId: number

    @IsInt()
    @Max(255)
    @Min(0)
    @IsNotEmpty()
    amount: number
}