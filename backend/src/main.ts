import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Logger as PinoLogger } from 'nestjs-pino';
import { AppModule } from './app.module';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { GlobalExceptionFilter } from './common/filters/global-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
    rawBody: true,
  });

  const logger = new Logger('Bootstrap');
  app.useLogger(app.get(PinoLogger));

  // CORS whitelist
  app.enableCors({
    origin: process.env.CORS_ORIGIN || '*',
    credentials: true,
  });

  // Global Validation Pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Global Response Interceptor & Exception Filter
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalFilters(new GlobalExceptionFilter());

  // Swagger OpenAPI Documentation
  const config = new DocumentBuilder()
    .setTitle('Book Publisher Platform API')
    .setDescription(
      'Heavy Production-Grade API Backend for "Essentials of Medical Device Clinical Research" (3-Volume Book Set) by Dr. Ashish Indani.',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('Auth')
    .addTag('Products')
    .addTag('Cart')
    .addTag('Orders')
    .addTag('Payments')
    .addTag('Invoices')
    .addTag('Leads')
    .addTag('Admin Dashboard')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.PORT || 8080;
  // Bind to 0.0.0.0 for GCP Cloud Run health checks
  await app.listen(port, '0.0.0.0');
  logger.log(`Book Publisher Backend is running on port ${port}`);
  logger.log(`OpenAPI Swagger documentation available at http://localhost:${port}/api/docs`);
}

bootstrap();
