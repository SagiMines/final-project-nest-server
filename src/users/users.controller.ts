import { Body, Controller, Get, Param, ParseIntPipe, Post, Query, UseGuards } from '@nestjs/common';
import { IsUserGuard } from './auth/is-user.guard';;
// import { AuthUserDetailsGuard } from './auth/auth-user-details.guard';
import { UserDto } from './user-dto';
import { UsersService } from './users.service';
import { Users } from './entities/users.entity';

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
