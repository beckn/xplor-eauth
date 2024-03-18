import { Test, TestingModule } from '@nestjs/testing';
import { HttpService, HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { of } from 'rxjs';
import { AxiosRequestHeaders, AxiosResponse } from 'axios';

import { dummyData } from '../common/constants/dummy-response';
import { JwtDecoder } from '../utils/jwtdecoder';
import { GetUserQueryDto } from './dto/get-user-query.dto';
import { DigilockerService } from './digilocker.service';

/**
 * Test suite for the DigilockerService class.
 * It verifies that the service correctly handles HTTP requests and responses,
 * and returns the expected user details.
 */
describe('DigilockerService', () => {
  let service: DigilockerService;
  let httpService: HttpService;
  let configService: ConfigService;

  // Before each test case, create a testing module and initialize the service
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule, ConfigModule.forRoot()],
      providers: [DigilockerService, ConfigService, JwtDecoder],
    }).compile();

    // Retrieve instances of required services
    service = module.get<DigilockerService>(DigilockerService);
    httpService = module.get<HttpService>(HttpService);
    configService = module.get<ConfigService>(ConfigService);
  });

  // Test case to ensure that the service is defined
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // Test case to ensure that user details are returned when HTTP request succeeds
  it('should return user details when HTTP request succeeds', async () => {
    // Mock configuration values
    jest
      .spyOn(configService, 'get')
      .mockReturnValueOnce('https://api.digitallocker.gov.in')
      .mockReturnValueOnce('client_id')
      .mockReturnValueOnce('client_secret')
      .mockReturnValueOnce('redirect_uri');

    // Mock HTTP request and response
    const responseData: AxiosResponse = {
      data: 'user details',
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {
        headers: {} as AxiosRequestHeaders,
      },
    };
    jest.spyOn(httpService, 'post').mockReturnValueOnce(of(responseData));

    // Call the getUserDetails method
    const code: GetUserQueryDto = { code: 'test_code' };
    const result = await service.getUserDetails(code);
    const mockedResult = {
      tokenDetails: {
        access_token: 'bc125c212a4b03a9a188a858be5a163f379e878a',
        consent_valid_till: 1684731048,
        expires_in: 3600,
        id_token: dummyData.id_token,
        scope: 'openid files.issueddocs partners.PANCR partners.DRVLC',
        token_type: 'Bearer',
      },
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

    // Assert that the user details are returned
    expect(result).toEqual(mockedResult);
  });

  // Test case to ensure that token details and user details are returned when HTTP request fails
  it('should return token details and user details when HTTP request fails', async () => {
    // Mock configuration values
    jest
      .spyOn(configService, 'get')
      .mockReturnValueOnce('https://api.digitallocker.gov.in')
      .mockReturnValueOnce('client_id')
      .mockReturnValueOnce('client_secret')
      .mockReturnValueOnce('redirect_uri');

    // Assuming errorResponse is meant to be an error object
    const errorResponse = new Error('ERR_BAD_REQUEST');

    jest.spyOn(httpService, 'post').mockRejectedValueOnce(errorResponse as Error as never);

    // Call the getUserDetails method
    const code: GetUserQueryDto = { code: 'test_code' };
    const result = await service.getUserDetails(code);

    // Assert that the token details and user details are returned
    expect(result).toEqual({
      tokenDetails: dummyData,
      userDetails: service['jwtDecoder'].decodeToken(dummyData.id_token),
    });
  });
});
