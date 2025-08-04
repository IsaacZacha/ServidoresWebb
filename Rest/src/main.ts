import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Configurar validación global
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  // Configurar CORS
  app.enableCors();

  // Prefijo global para API
  app.setGlobalPrefix('api');

  await app.listen(process.env.PORT || 3000);
  console.log(`🚀 Servidor corriendo en http://localhost:${process.env.PORT || 3000}/api`);
}
bootstrap();
