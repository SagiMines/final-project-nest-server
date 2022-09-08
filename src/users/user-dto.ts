import { IsNotEmpty, IsNumberString, MaxLength, MinLength, IsEmail, IsString, IsInt, IsOptional } from 'class-validator'

export class UserDto {
    
    @IsOptional()
    @IsNotEmpty()
    @IsInt()
    id: number

    @IsNotEmpty()
    @MaxLength(50)
    firstName: string

    @IsNotEmpty()
    @MaxLength(50)
    lastName: string

    @IsOptional()
    @MaxLength(100)
    address: string

    @MaxLength(32)
    country: string

    @IsOptional()
    @MaxLength(20)
    city: string

    @IsOptional()
    @MaxLength(10)
    @IsNumberString()
    postalCode: string

    @IsOptional()
    @MaxLength(24)
    @IsNumberString()
    phone: string

    @MaxLength(50)
    @IsEmail()
    email: string

    @MaxLength(250)
    @MinLength(10)
    @IsString()
    password: string
}
