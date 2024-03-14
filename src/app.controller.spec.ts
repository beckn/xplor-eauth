import { Test, TestingModule } from '@nestjs/testing';

import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    // Create a testing module with AppController as the controller and AppService as the provider
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    // Retrieve an instance of the AppController from the testing module
    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    // Test case to verify the behavior of the getHello method
    it('should return "Hello World!"', () => {
      // Assert that the getHello method returns the expected response object
      expect(appController.getHello()).toEqual({
        status: 'ok',
        version: '1.0.0',
        serverMessage: 'Server is up and running',
      });
    });
  });
});
