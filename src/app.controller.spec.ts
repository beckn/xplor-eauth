import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IProvider } from './app.interface';
import envValidation from './config/env.validation';
import configuration from './config/configuration';

describe('AppController', () => {
  let controller: AppController;

  beforeEach(async () => {
    // Create a testing module with AppController as the controller and AppService as the provider
    const app: TestingModule = await Test.createTestingModule({
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
      ],
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    // Retrieve an instance of the AppController from the testing module
    controller = app.get<AppController>(AppController);
  });

  describe('root', () => {
    // Test case to verify the behavior of the getHello method
    it('should return "Hello World!"', () => {
      // Assert that the getHello method returns the expected response object
      expect(controller.getHello()).toEqual({
        status: 'ok',
        version: '1.0.0',
        serverMessage: 'Server is up and running',
      });
    });

    it('should return providers with updated redirect URLs', async () => {
      // Mock providers array with sample data
      const mockProviders: IProvider[] = [
        {
          code: 'digilocker',
          iconLink: 'https://example.com/icon1.png',
          title: 'Provider 1',
          subTitle: 'Sub Title 1',
          redirectUrl: '', // This will be updated by the service method
        },
        {
          code: 'googleAuth',
          iconLink: 'https://example.com/icon2.png',
          title: 'Provider 2',
          subTitle: 'Sub Title 2',
          redirectUrl: '', // This will be updated by the service method
        },
      ];
      // Make the request to the controller method
      const result: IProvider[] = controller.getProviders();
      mockProviders.forEach((_provider, index) => {
        mockProviders[index].redirectUrl = result[index].redirectUrl;
      });

      // Assert that the response contains the updated providers
      expect(result).toEqual(mockProviders);
    });
  });
});
