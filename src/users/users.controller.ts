import { Body, Controller, Get, HttpException, HttpStatus, Param, ParseIntPipe, Patch, Post, Query, Redirect, Req, Res, UseGuards } from '@nestjs/common';
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

    // Authenticate user to enable certain paths
    @Get('authenticate-user') 
    authenticateUser(@Req() req: Request) {
        const session = req.session
        if(!session['authenticated']) {
            session['authenticated'] = true
        }
        return true
    }

    @Get('update-authentication/:pathToCheck')
    updateAuthentication(@Req() req: Request, @Param('pathToCheck') pathToCheck: string) {
        const session = req.session
        console.log(pathToCheck)
        if(pathToCheck === 'change-password' || pathToCheck === 'change-password-approved') {
            delete session['email-approved']
            session['finished-forgot-password'] = true
        } else if(pathToCheck === 'change-password-success') {
            delete session['finished-forgot-password']
        } else if(pathToCheck === 'register-success') {
            delete session['register-done']
        } else if(pathToCheck === 'order-confirmation') {
            delete session['order-complete']
        }
        return true
    }

    @Get('forgot-password')
    // assigned middleware
    @Redirect()
    sendEmailLink(
        @Query('email') email: string,
        @Query('token') token: string,
        @Query('from') from: string,
    ) {
        
        if(token && !from) {
            
            return {url: `${process.env.ORIGIN}/change-password-approved`}
        } else if(token && from) {
            return {url: `${process.env.ORIGIN}/change-password-approved?from=${from}`}
        }
        
        throw new HttpException('A link to change your password was sent via email', HttpStatus.OK)
    }

    // Get the user details from the email provided
    @Get('forgotten-password-user')
    // assigned middleware
    getForgottenUser(@Req() req: Request) : Promise<Users> {
        return this.usersService.findByEmail(req['userEmail'])
    } 

    @Get('forgotten-password-user-redirect')
    // assigned middleware
    redirectd(@Query('email') email: string, @Query('from') from: string) {
        throw new HttpException('Successfully redirected', HttpStatus.OK)
    }




    @Get('send-verification-link')
    // assigned middleware
    @Redirect()
    sendVerificationLink(@Query('email') email: string, @Query('token') token: string, @Req() req: Request) {
        if(token) {
            return process.env.NODE_ENV === 'production' ? {url: `https://server.workshop-il.com/api/register?token=${token}`} : {url: `http://localhost:8000/api/register?token=${token}`}
        }
        throw new HttpException('Mail sent', HttpStatus.OK)
    }
    

    @Post(':id')
    // assigned middleware
    isPasswordCorrect(@Param('id', ParseIntPipe) id: number, @Body() password: string) {
        throw new HttpException('Passwords are the same', HttpStatus.OK)
    }
    
    @Post()
    addUser(@Body() user: UserDto) {
        return this.usersService.addUser(user) 
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
