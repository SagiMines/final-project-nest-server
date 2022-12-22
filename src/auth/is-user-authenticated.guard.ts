import { Injectable, CanActivate, ExecutionContext, ConsoleLogger } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class IsUserAuthenticatedGuard implements CanActivate {
    constructor(private readonly usersService: UsersService) {}
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const session = context.switchToHttp().getRequest().session
    console.log(session)
    const {pathToCheck} = context.switchToHttp().getRequest().params
    console.log(pathToCheck)
    if((pathToCheck === 'my-account' || pathToCheck ==='change-password' || pathToCheck === 'my-orders') &&  !session['authenticated']) {
        return false
    } else if(pathToCheck === 'change-password-approved' && !session['email-approved']) {
        return false
    } else if(pathToCheck === 'email-confirmation-password' && !session['email-verified']) {
        return false
    } else if(pathToCheck === 'change-password-success' && !session['finished-forgot-password']) {
        return false
    } else if(pathToCheck === 'email-confirmation-register' && !session['register-verified']) {
        return false
    } else if(pathToCheck === 'register-success' && !session['register-done']) {
        return false
    } else if(pathToCheck === 'order-confirmation' && !session['order-complete']) {
        return false
    }
    return true
  }
}