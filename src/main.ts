import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  // Create the Nest application instance
  const app = await NestFactory.create(AppModule, { cors: true });

  // Set up global validation pipe to apply validation to incoming requests
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strips non-decorated properties from input objects
    }),
  );

  // Set global prefix for all routes
  app.setGlobalPrefix('api/v1');

  // Start the application and listen on port 3000
  await app.listen(3000);
}

bootstrap();
