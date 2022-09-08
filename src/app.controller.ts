import { Controller, Get, HttpException, HttpStatus, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';
import { IsUserExistGuard } from './auth/is-user-exists.guard';
import { UsersService } from './users/users.service';

@Controller()
export class AppController {

  @Post('login')
  @UseGuards(IsUserExistGuard)
  checkUser() {
    throw new HttpException('OK', HttpStatus.OK)
  }


}
