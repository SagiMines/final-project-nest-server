import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as cryptoJS from 'crypto-js'
import * as bcrypt from 'bcrypt'

@Injectable()
export class IsUserExistGuard implements CanActivate {
    constructor(private readonly usersService: UsersService) {}
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const {email, password} = context.switchToHttp().getRequest().body
    const found = (await this.usersService.findByEmail(email))
    if (found) {
      const arePasswordsTheSame = await bcrypt.compare(
        password,
        found.password
      );
  
      if (arePasswordsTheSame) {
        const session = context.switchToHttp().getRequest().session
        let encryptedUserId
        try {
          encryptedUserId = cryptoJS.AES.encrypt(found.id.toString(), process.env.CRYPTO_SECRET)
        } catch {
          throw new HttpException('Could not encrypt the user ID', HttpStatus.CONFLICT)
        }
        context.switchToHttp().getResponse().cookie('user_id', encryptedUserId.toString(), process.env.NODE_ENV === 'production' ?  {domain: '.workshop-il.com',  secure: true, maxAge: 365*24*60*60*1000, httpOnly: false, sameSite: 'none'} : {maxAge: 365*24*60*60*1000, httpOnly: false})
        session.authenticated = true;
        session.user = { ...found };
        if(session.awaitingApproval) {
          delete session.awaitingApproval
        }
      } else return false
    } else return false
    return true
  }
}