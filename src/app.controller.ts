import { Controller, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { IsUserExistGuard } from './auth/is-user-exists.guard';
import * as cryptoJS from 'crypto-js'
@Controller()
export class AppController {

  @Post('login')
  @UseGuards(IsUserExistGuard)
  checkUser() {
    throw new HttpException('OK', HttpStatus.OK)
  }

  @Get('login/:encryptedUserId')
  // assigned middleware
  isUserConnected(@Param('encryptedUserId') encryptedUserId: string) {
    let decryptedUserId
    decryptedUserId = cryptoJS.AES.decrypt(encryptedUserId, process.env.CRYPTO_SECRET)
    decryptedUserId = decryptedUserId.toString(cryptoJS.enc.Utf8);
    
    return decryptedUserId
  }

  @Post('register')
  //assiged middleware
  addUser() {
    throw new HttpException('OK', HttpStatus.OK)
  }


}
