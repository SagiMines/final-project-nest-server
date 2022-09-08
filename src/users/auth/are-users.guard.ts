import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UsersService } from '../users.service';

@Injectable()
export class AreUsersGuard implements CanActivate {
    constructor(private readonly usersService: UsersService) {}
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const isUsers = (await this.usersService.getUsers()).length > 0
    return isUsers
  }
}