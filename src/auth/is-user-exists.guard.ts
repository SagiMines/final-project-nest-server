import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import session from 'express-session';
import { Observable } from 'rxjs';
import { UsersService } from '../users/users.service';

@Injectable()
export class IsUserExistGuard implements CanActivate {
    constructor(private readonly usersService: UsersService) {}
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const {email, password} = context.switchToHttp().getRequest().body
    const found = (await this.usersService.getUsers()).find(user => user.email === email && user.password === password)
    if(found)  {
      context.switchToHttp().getRequest().session.user = found
      return true
    }
    return false
  }
}