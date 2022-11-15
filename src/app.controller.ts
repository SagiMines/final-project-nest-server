import { Controller, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, Query, Redirect, UseGuards } from '@nestjs/common';
import { IsUserExistGuard } from './auth/is-user-exists.guard';
import * as cryptoJS from 'crypto-js'
import * as dotenv from 'dotenv'
dotenv.config()
@Controller()
export class AppController {

  @Post('login')
  @UseGuards(IsUserExistGuard)
  checkUser() {
    throw new HttpException('OK', HttpStatus.OK)
  }

  // Checks if the user that is trying to connect is already connected
  @Get('login/:encryptedUserId')
  // assigned middleware
  isUserConnected(@Param('encryptedUserId') encryptedUserId: string) {
    let decryptedUserId
    decryptedUserId = cryptoJS.AES.decrypt(encryptedUserId, 'dd##$FD34tg!!!2')
    decryptedUserId = decryptedUserId.toString(cryptoJS.enc.Utf8);
    
    return decryptedUserId
  }

  @Get('register') 
  // assigned middleware
  @Redirect(`https://workshop-il.netlify.app/register-success`)
  verifyMail() {
  }

  @Post('register')
  //assiged middleware
  addUser() {
    throw new HttpException('OK', HttpStatus.OK)
  }

  @Post('logout')
  //assiged middleware
  logOutFromSite() {
    throw new HttpException('OK', HttpStatus.OK)
  }


}
