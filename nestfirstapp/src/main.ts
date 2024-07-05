import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe()); // Al crear validaciones en los DTOs, se validaran de manera automatica
  await app.listen(3000);
  
}
bootstrap();
