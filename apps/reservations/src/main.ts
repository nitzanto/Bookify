import { NestFactory } from '@nestjs/core';
import { ReservationsModule } from './modules/reservations.module';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(ReservationsModule);
  app.enableCors({
    origin: [
      'http://localhost:5173',
      'https://bookify-sand.vercel.app',
      'https://bookify-9tw29quy8-nitzanto.vercel.app',
      'https://bookify-nitzanto.vercel.app',
    ],
    credentials: true, // enable credentials (cookies, authorization headers)
  });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useLogger(app.get(Logger));
  app.use(cookieParser());
  const configService = app.get(ConfigService);
  await app.listen(configService.get('PORT'));
}

bootstrap();
