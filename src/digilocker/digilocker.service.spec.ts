import { Test, TestingModule } from '@nestjs/testing';

import { DigilockerService } from './digilocker.service';

/**
 * Test suite for the DigilockerService class.
 * It verifies that the service is correctly defined and instantiated.
 */
describe('DigilockerService', () => {
  let service: DigilockerService;

  // Before each test case, create a testing module and initialize the service
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DigilockerService],
    }).compile();

    // Retrieve an instance of the DigilockerService
    service = module.get<DigilockerService>(DigilockerService);
  });

  // Test case to ensure that the service is defined
  it('should be defined', () => {
    // Assert that the service is not null or undefined
    expect(service).toBeDefined();
  });
});
