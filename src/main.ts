import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: process.env.CORS_ORIGIN || '*',
  });
  app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));
  const port = process.env.PORT || 3000;
  await app.listen(port);
}
bootstrap();
