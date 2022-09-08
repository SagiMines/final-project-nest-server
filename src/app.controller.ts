import { Controller, Get, HttpException, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { IsUserExistGuard } from './auth/is-user-exists.guard';
import bcrypt from 'bcrypt'
@Controller()
export class AppController {

  @Post('login')
  @UseGuards(IsUserExistGuard)
  checkUser() {
    throw new HttpException('OK', HttpStatus.OK)
  }

  @Post('register')
  //assiged middleware
  addUser() {
    throw new HttpException('OK', HttpStatus.OK)
  }


}
