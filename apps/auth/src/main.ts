import { NestFactory } from '@nestjs/core';
import { AuthModule } from './modules/auth.module';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  const configService = app.get(ConfigService);

  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true, // enable credentials (cookies, authorization headers)
  });

  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [configService.getOrThrow('RABBITMQ_URI')],
      queue: 'auth',
    },
  });
  app.use(cookieParser()); // all requests with cookies will go through this and be parsed
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useLogger(app.get(Logger));
  await app.startAllMicroservices();
  await app.listen(configService.get('HTTP_PORT'));
}

bootstrap();
