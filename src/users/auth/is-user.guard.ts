import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { UsersService } from '../users.service';

@Injectable()
export class IsUserGuard implements CanActivate {
    constructor(private readonly usersService: UsersService) {}
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const userId = context.switchToHttp().getRequest().params.id
    if(await this.usersService.findById(Number(userId))) return true
    return false
  }
}