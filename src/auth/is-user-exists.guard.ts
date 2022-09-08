import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { UsersService } from '../users/users.service';
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
        session.authenticated = true;
        session.user = { ...found };
      } else return false
    } else return false
    return true
  }
}