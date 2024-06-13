import { Test, TestingModule } from '@nestjs/testing';
import { HttpModule, HttpService } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { of } from 'rxjs';

import { JwtDecoder } from '../utils/jwtdecoder';
import { GetUserQueryDto } from './dto/get-user-query.dto';
import { DigilockerService } from './digilocker.service';
import { GetTokenQueryDto } from './dto/get-token-query-dto';
import { mockedFailures, mockedRefreshToken, mockedToken } from '../common/constants/mock';

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
    const code: GetUserQueryDto = { code: 'test_code', state: '' };
    const result = await service.getUserDetails(code);

    // Assert that the result matches the expected user details
    const mockedResult = mockedFailures;
    // Assert that the token details and user details are returned
    expect(result).toEqual(mockedResult);
  });

  it('should return a valid access token when refreshing token', async () => {
    // Mocking configuration values
    jest.spyOn(service['config'], 'get').mockReturnValueOnce(configService.get<string>('DIGILOCKER_BASE_URL'));
    jest.spyOn(service['config'], 'get').mockReturnValueOnce(configService.get<string>('DIGILOCKER_CLIENT_ID'));
    jest.spyOn(service['config'], 'get').mockReturnValueOnce(configService.get<string>('DIGILOCKER_CLIENT_SECRET'));

    // Assert that the result matches the expected user details
    const mockedResult = mockedRefreshToken;

    // Mocking HTTP request
    const response = { data: mockedResult };
    jest.spyOn(httpService, 'post').mockReturnValueOnce(of(response as any));

    // Call the method under test
    const result = await service.getRefreshToken({} as GetUserQueryDto);
    // Verify the result
    expect(result).toEqual(mockedResult);
  });

  it('should return a valid access token when refreshing token', async () => {
    // Mocking configuration values
    jest.spyOn(service['config'], 'get').mockReturnValueOnce(configService.get<string>('DIGILOCKER_BASE_URL'));
    const mockedResult = mockedToken;

    // Mocking HTTP request
    const response = { data: mockedResult };
    jest.spyOn(httpService, 'post').mockReturnValueOnce(of(response as any));

    // Call the method under test
    const result = await service.getRefreshAccessToken({} as GetTokenQueryDto);
    // Verify the result
    expect(result).toEqual(mockedResult);
  });
});
