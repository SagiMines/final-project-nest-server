import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/users.entity';
import { GetUserMiddleware } from './middlewares/get-user.middleware';
import { IsPasswordCorrectMiddleware } from './middlewares/is-password-correct.middleware';
import { IsUserExistsMiddleware } from './middlewares/is-user-exists.middleware';
import { SendEmailLinkMiddleware } from './middlewares/send-email-link.middleware';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(IsUserExistsMiddleware).forRoutes(
      {
        path: 'users/:id',
        method: RequestMethod.PATCH
      }
    ),
    consumer.apply(IsPasswordCorrectMiddleware).forRoutes(
      {
        path: 'users/:id',
        method: RequestMethod.POST
      }
    ),
    consumer.apply(SendEmailLinkMiddleware).forRoutes(
      {
        path: 'users/forgot-password',
        method: RequestMethod.GET
      }
    ),
    consumer.apply(GetUserMiddleware).forRoutes(
      {
        path: 'users/forgotten-password-user',
        method: RequestMethod.GET
      }
    )
  }
}
