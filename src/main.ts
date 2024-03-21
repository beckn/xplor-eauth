import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  // Create the Nest application instance
  const app = await NestFactory.create(AppModule, { cors: true });
  const configService = app.get(ConfigService);

  // Set up global validation pipe to apply validation to incoming requests
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strips non-decorated properties from input objects
    }),
  );

  // Set global prefix for all routes
  app.setGlobalPrefix('api/v1');
  const config = new DocumentBuilder()
    .setTitle('Eauth API')
    .setDescription('This API provides endpoints for Eauth')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/v1', app, document);

  // Start the application and listen on port 3000
  await app.listen(configService.get<string>('port'));
}

bootstrap();
