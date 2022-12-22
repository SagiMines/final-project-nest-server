import { Controller, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, Query, Redirect, UseGuards } from '@nestjs/common';
import { IsUserExistGuard } from './auth/is-user-exists.guard';
import * as cryptoJS from 'crypto-js'
import * as dotenv from 'dotenv'
import { IsUserAuthenticatedGuard } from './auth/is-user-authenticated.guard';
dotenv.config()
@Controller()
export class AppController {

  @Post('login')
  @UseGuards(IsUserExistGuard)
  checkUser() {
    throw new HttpException('OK', HttpStatus.OK)
  }

  @Get('authentication-check/:pathToCheck') 
  @UseGuards(IsUserAuthenticatedGuard)
  checkAuthentication() {
    return true
  }

  // Checks if the user that is trying to connect is already connected
  @Get('login/:encryptedUserId')
  // assigned middleware
  isUserConnected(@Param('encryptedUserId') encryptedUserId: string) {
    let decryptedUserId
    decryptedUserId = cryptoJS.AES.decrypt(encryptedUserId, process.env.CRYPTO_SECRET)
    decryptedUserId = decryptedUserId.toString(cryptoJS.enc.Utf8);
    
    return decryptedUserId
  }

  @Get('register') 
  // assigned middleware
  @Redirect()
  verifyMail(@Query('token') token: string, @Query('from') from: string) {
    //Regular registration
    if(token && !from) {
      return {url: `${process.env.ORIGIN}/register-success`}
      //Registration through order
    } else if(token && from) {
      return {url: `${process.env.ORIGIN}/register-success?from=${from}`}
    }
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

  @Post('contact-us')
  //assiged middleware
  getUserMessage() {
    throw new HttpException('OK', HttpStatus.OK)
  }
}
