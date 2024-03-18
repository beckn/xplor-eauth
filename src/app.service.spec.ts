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

  it('should update redirect URLs for providers', () => {
    // Call the getProviders method
    const updatedProviders = service.getProviders();
    updatedProviders.forEach((provider) => {
      if (provider.code === 'digilocker') {
        provider.redirectUrl = 'https://example.com/digilocker';
      } else if (provider.code === 'googleAuth') {
        provider.redirectUrl = 'https://example.com/google-auth';
      }
    });

    // Assert that the redirect URLs are updated correctly
    expect(updatedProviders).toEqual([
      {
        code: 'digilocker',
        iconLink: 'https://example.com/icon1.png',
        title: 'Provider 1',
        subTitle: 'Sub Title 1',
        redirectUrl: 'https://example.com/digilocker', // Assert updated redirect URL
      },
      {
        code: 'googleAuth',
        iconLink: 'https://example.com/icon2.png',
        title: 'Provider 2',
        subTitle: 'Sub Title 2',
        redirectUrl: 'https://example.com/google-auth', // Assert updated redirect URL
      },
    ]);
  });
});
