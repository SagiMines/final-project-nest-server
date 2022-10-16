import { Body, Controller, Get, HttpException, HttpStatus, Param, ParseIntPipe, Patch, Post, Query, Redirect, Req, UseGuards } from '@nestjs/common';
import { IsUserGuard } from './auth/is-user.guard';;
// import { AuthUserDetailsGuard } from './auth/auth-user-details.guard';
import { UserDto } from './user-dto';
import { UsersService } from './users.service';
import { Users } from './entities/users.entity';
import { Request, Response } from 'express';
import {  UpdateResult } from 'typeorm';
import * as dotenv from 'dotenv'
dotenv.config()
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}
    

    @Get()
    getUserByEmail(@Query('email') email: string) : Promise<Users | Users[]>{
        if(!email) {
            return this.usersService.getUsers()
        }
        return this.usersService.findByEmail(email)
    }



    @Get('forgot-password')
    // assigned middleware
    @Redirect()
    sendEmailLink(
        @Query('email') email: string,
        @Query('token') token: string
    ) {
        if(token) {
            return {url: `${process.env.ORIGIN}/change-password-approved`}
        }
        throw new HttpException('A link to change your password was sent via email', HttpStatus.OK)
    }

    // Get the user details from the email provided in the session
    @Get('forgotten-password-user')
    // assigned middleware
    getForgottenUser(@Req() req: Request): Promise<Users> {
        return this.usersService.findByEmail(req['userEmail'])
    }
    

    @Post(':id')
    // assigned middleware
    isPasswordCorrect(@Param('id', ParseIntPipe) id: number, @Body() password: string) {
        throw new HttpException('Passwords are the same', HttpStatus.OK)
    }
    
    @Post()
    addUser(@Body() user: UserDto) {
        this.usersService.addUser(user) 
    }


    @Get(':id')
    @UseGuards(IsUserGuard)
    getUser(@Param('id', ParseIntPipe) id: number){
        return this.usersService.findById(id)
    }

    @Patch(':id')
    // assigned middleware
    updateUserDetails(@Param('id', ParseIntPipe) id: number, @Body() user: UserDto): Promise<UpdateResult> {
        this.usersService.updateUserDetails(user, id)
        throw new HttpException('Successfully updated the database', HttpStatus.OK)
    }

    
}
