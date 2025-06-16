import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true, //gives error where fields is undefined
      transform: true, //convert np. string -> number
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
  console.log('Application is running on port: ', process.env.PORT);
}
bootstrap();
