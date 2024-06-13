import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import * as Joi from 'joi';

import envValidation from './config/env.validation';
import { DigilockerModule } from './digilocker/digilocker.module';
import { AppService } from './app.service';

/**
 * Test suite for the DigilockerService class.
 * It verifies that the service is correctly defined and instantiated.
 */
describe('DigilockerService', () => {
  let service: AppService;

  // Before each test case, create a testing module and initialize the service
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
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
      providers: [AppService],
    }).compile();

    // Retrieve an instance of the DigilockerService
    service = module.get<AppService>(AppService);
  });

  // Test case to ensure that the service is defined
  it('should be defined', () => {
    // Assert that the service is not null or undefined
    expect(service).toBeDefined();
  });
});