import { Body, Controller, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { runInThisContext } from 'vm';
import { IsUserGuard } from './auth/is-user.guard';
import { AreUsersGuard } from './auth/are-users.guard';
// import { AuthUserDetailsGuard } from './auth/auth-user-details.guard';
import { UserDto } from './user-dto';
import { UsersService } from './users.service';
import { UsersRepository } from './repository/users.repository';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}
    
    @Get()
    @UseGuards(AreUsersGuard)
    getUsers(){
        return this.usersService.getUsers()
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
}
