import { Test, TestingModule } from '@nestjs/testing';

import { DigilockerController } from './digilocker.controller';
import { DigilockerService } from './digilocker.service';
import { GetUserQueryDto } from './dto/get-user-query.dto';
import { dummyData } from '../common/constants/dummy-response';
import { GetTokenQueryDto } from './dto/get-token-query-dto';

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
      expect(result).toEqual(userDetails);
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
      expect(result).toEqual(error.message);
    });

    it('should return a valid access token when refreshing token', async () => {
      // Mocking request query
      const refresh_token: GetTokenQueryDto = {} as GetTokenQueryDto;

      // Mocking service method
      const mockedResult = {
        access_token: 'bc125c212a4b03a9a188a858be5a163f379e878a',
        token_type: 'Bearer',
        expires_in: 3600,
        refresh_token: 'a47ab18c593703e4f83a274694db7422a8cfcb8f',
        scope: 'files.issueddocs partners.PANCR partners.DRVLC',
        consent_valid_till: 1684731048,
      };
      jest.spyOn(service, 'getRefreshAccessToken').mockResolvedValue(mockedResult);

      // Call the method under test
      const result = await controller.getAcessToken(refresh_token);

      // Verify the result
      expect(result).toEqual(mockedResult);
    });
  });
});
