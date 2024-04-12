import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DigilockerModule } from './digilocker/digilocker.module';
import configuration from './config/configuration';
import envValidation from './config/env.validation';

@Module({
  imports: [
    // Importing ConfigModule for global configuration handling
    ConfigModule.forRoot({
      isGlobal: true, // Makes the configuration module available globally
      load: [configuration], // Loads custom configuration files
      validationSchema: Joi.object(envValidation()), // Validates environment variables
      validationOptions: {
        abortEarly: false, // Do not abort on the first validation error
      },
    }),
    // Importing DigilockerModule to include its controllers and providers
    DigilockerModule,
  ],
  controllers: [AppController], // Specifies controllers to be included in this module
  providers: [AppService], // Specifies services to be included in this module
})
export class AppModule {}
