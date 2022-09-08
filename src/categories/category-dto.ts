import { IsNotEmpty, IsInt, MaxLength, IsOptional } from 'class-validator'
export class CategoryDto {
    @IsOptional()
    @IsNotEmpty()
    @IsInt()
    id: number

    @IsNotEmpty()
    @MaxLength(50)
    categoryName: string
}
