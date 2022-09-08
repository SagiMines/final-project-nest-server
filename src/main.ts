import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as dotenv from 'dotenv'
import { ConfigService } from '@nestjs/config';
dotenv.config()

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService)
  const port = configService.get('PORT')
  const secret = configService.get('SECRET')
  const origin = configService.get('ORIGIN')
  app.enableCors({
    "origin": origin,
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204,
    "credentials": true
  });
  app.use(
    session({
      secret: secret,
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 8*60*60*1000 }, 
    })
  )
  app.setGlobalPrefix('api')
  await app.listen(port);
}
bootstrap();
