import { IsBoolean, IsInt, IsNotEmpty, Max, Min } from "class-validator";

export class CartDto {
    @IsInt()
    @IsNotEmpty()
    userId: number

    @IsInt()
    @IsNotEmpty()
    productId: number

    @IsBoolean()
    @IsNotEmpty()
    checked: boolean

    @IsInt()
    @Max(255)
    @Min(0)
    @IsNotEmpty()
    amount: number
}