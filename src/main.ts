import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as dotenv from 'dotenv'
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
dotenv.config()

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  
  const configService = app.get(ConfigService)
  const port = configService.get('PORT')
  const secret = configService.get('SECRET')
  const origin = configService.get('ORIGIN')
  app.enableCors({
    "origin": 'https://workshop-il.netlify.app',
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204,
    "credentials": true,
    "allowedHeaders": 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept',

  });
  app.set('trust proxy', 1)
  app.use(
    session({
      secret: 'JDSAJDIAJmdimjijm23424rofos!@!Ddcd',
      resave: false,
      saveUninitialized: false,
      //expires in 1 year
      cookie: { domain: '.netlify.app', secure: true, maxAge: 365*24*60*60*1000, httpOnly: false, sameSite: 'none'}, 
    })
  )
  app.setGlobalPrefix('api')
  
  await app.listen(process.env.PORT || port);
}
bootstrap();
