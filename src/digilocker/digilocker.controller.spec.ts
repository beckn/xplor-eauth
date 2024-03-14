import { Test, TestingModule } from '@nestjs/testing';

import { DigilockerController } from './digilocker.controller';
import { DigilockerService } from './digilocker.service';

describe('DigilockerController', () => {
  let controller: DigilockerController;

  beforeEach(async () => {
    // Create a testing module
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DigilockerController], // Include DigilockerController in the testing module
      providers: [DigilockerService], // Include DigilockerService in the testing module
    }).compile(); // Compile the testing module

    // Retrieve an instance of DigilockerController from the testing module
    controller = module.get<DigilockerController>(DigilockerController);
  });

  // Test case to check if DigilockerController is defined
  it('should be defined', () => {
    expect(controller).toBeDefined(); // Assert that the controller is defined
  });
});
