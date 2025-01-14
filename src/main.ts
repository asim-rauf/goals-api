import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { raw } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { rawBody: true });

  // Enable CORS for all origins
  app.enableCors({
    origin: '*', // Allows requests from any origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE' // Allowed HTTP methods
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true
    })
  );

  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
