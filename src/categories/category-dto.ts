import { IsNotEmpty, IsInt, MaxLength } from 'class-validator'


export class CategoryDto {

    @IsNotEmpty()
    @IsInt()
    id: number

    @IsNotEmpty()
    @MaxLength(50)
    categoryName: string
}
