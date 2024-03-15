import { Test, TestingModule } from '@nestjs/testing';

import { DigilockerController } from './digilocker.controller';
import { DigilockerService } from './digilocker.service';
import { GetUserQueryDto } from './dto/get-user-query.dto';
import { dummyData } from '../common/constants/dummy-response';

describe('DigilockerController', () => {
  let controller: DigilockerController;
  let service: DigilockerService;

  beforeEach(async () => {
    // Create a testing module
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DigilockerController],
      providers: [DigilockerService], // Add the DigilockerService to the providers array
    }).compile(); // Compile the testing module

    // Retrieve an instance of DigilockerController and DigilockerService from the testing module
    controller = module.get<DigilockerController>(DigilockerController);
    service = module.get<DigilockerService>(DigilockerService);
  });

  // Test case to check if DigilockerController is defined
  it('should be defined', () => {
    expect(controller).toBeDefined(); // Assert that the controller is defined
  });

  // Test suite for the getUserDetails method
  describe('getUserDetails', () => {
    // Test case to verify that getUserDetails returns user details when successful
    it('should return user details', async () => {
      // Mock GetUserQueryDto object
      const code: GetUserQueryDto = { code: 'test_code' };
      // Mock user details response
      const userDetails = {
        tokenDetails: dummyData,
        userDetails: {
          birthdate: '01/01/1990',
          driving_licence: 'DL01202200000001',
          email: 'ajit.kumar@digilocker.giv.in',
          given_name: 'Ajit Kumar',
          masked_aadhaar: 'xxxxxxx1234',
          pan_number: 'ABCDK1232G',
          phone_number: '9876543210',
          preferred_username: 'ajit.dl',
          user_sso_id: 'DL-93f3390c-6d92-11e9-a85e-9457a5645069',
        },
      };
      // Mock the getUserDetails method of DigilockerService to return the mocked user details
      jest.spyOn(service, 'getUserDetails').mockResolvedValueOnce(userDetails);

      // Call the getUserDetails method of DigilockerController
      const result = await controller.getUserDetails(code);

      // Assert that the result matches the expected user details response
      expect(result).toEqual({
        success: true,
        data: userDetails,
      });
    });

    // Test case to verify that getUserDetails handles errors and returns false success
    it('should handle errors and return false success', async () => {
      // Mock GetUserQueryDto object
      const code: GetUserQueryDto = { code: 'test_code' };
      // Mock error object
      const error = new Error('Failed to fetch user details');
      // Mock the getUserDetails method of DigilockerService to reject with the mocked error
      jest.spyOn(service, 'getUserDetails').mockRejectedValueOnce(error);

      // Call the getUserDetails method of DigilockerController
      const result = await controller.getUserDetails(code);

      // Assert that the result indicates false success and contains the error message
      expect(result).toEqual({
        success: false,
        data: error.message,
      });
    });
  });
});
