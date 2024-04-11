import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

import { dummyTokenData } from './../common/constants/dummy-response';
import { JwtDecoder } from './../utils/jwtdecoder';
import { IBasicUserDetails } from './interface/user-details.interface';
import { GetUserQueryDto } from './dto/get-user-query.dto';
import { HttpData } from '../common/http-data';
import { HttpConfig } from '../common/http-config';
import { KeyFilteration } from '../utils/keyfilteration';
import { IAccessToken } from './interface/access-token.interface';
import { GetTokenQueryDto } from './dto/get-token-query-dto';

@Injectable()
export class DigilockerService {
  // Declare class variables
  private http: HttpService;
  private config: ConfigService;
  private jwtDecoder: JwtDecoder;
  private httpData: HttpData;
  private httpConfig: HttpConfig;
  private filterKeys = new KeyFilteration();

  constructor() {
    // Initialize dependencies
    this.http = new HttpService();
    this.config = new ConfigService();
    this.jwtDecoder = new JwtDecoder();
    this.httpData = new HttpData();
    this.httpConfig = new HttpConfig();
  }

  /**
   * Retrieves user details from Digilocker based on the provided code.
   * @param code The code received from Digilocker authorization.
   * @returns User details from Digilocker.
   */
  async getUserDetails(code: GetUserQueryDto): Promise<any> {
    // Get configuration values
    const url = this.config.get<string>('DIGILOCKER_BASE_URL') + '/2/token';

    try {
      // Send HTTP request to Digilocker
      const response = await firstValueFrom(
        this.http.post(url, this.httpData.tokenData(code), this.httpConfig.formUrlEncodedData()),
      );
      const data = response.data;
      const userDetails: IBasicUserDetails = this.jwtDecoder.decodeToken(data.id_token);
      return userDetails;
    } catch (error) {
      return error?.response?.data;
    }
  }

  /**
   * Retrieves a refresh token from Digilocker.
   * @param code The code received from Digilocker authorization.
   * @returns Refresh token details.
   */
  async getRefreshToken(code: GetUserQueryDto): Promise<IAccessToken> {
    // Get configuration values
    const url = this.config.get<string>('DIGILOCKER_BASE_URL') + '/1/token';

    try {
      // Send HTTP request to Digilocker
      const response = await firstValueFrom(
        this.http.post(url, this.httpData.tokenData(code), this.httpConfig.formUrlEncodedData()),
      );
      return response.data;
    } catch (error) {
      // Handle errors
      if (error.code === 'ERR_BAD_REQUEST') {
        // Use dummy token data for testing
        const result = this.filterKeys.filterKeys(dummyTokenData, [
          'access_token',
          'token_type',
          'expires_in',
          'refresh_token',
          'digilockerid',
          'scope',
          'consent_valid_till',
          'id_token',
        ]);
        return result;
      }
    }
  }

  /**
   * Asynchronously retrieves a new access token by sending a POST request to the Digilocker API.
   * @param token The token data required for refreshing the access token.
   * @returns A promise that resolves to an access token object.
   */
  async getRefreshAccessToken(token: GetTokenQueryDto): Promise<IAccessToken> {
    // Get configuration values
    const url = this.config.get<string>('DIGILOCKER_BASE_URL') + '/1/token';
    const config = this.httpConfig.RefreshAcessTokenData(
      this.config.get<string>('DIGILOCKER_CLIENT_ID'),
      this.config.get<string>('DIGILOCKER_SECRET'),
    );

    try {
      // Send HTTP request to Digilocker
      const response = await firstValueFrom(this.http.post(url, this.httpData.accessTokenData(token), config));
      return response.data;
    } catch (error) {
      // Handle errors
      if (error.code === 'ERR_BAD_REQUEST') {
        // Use dummy token data for testing
        const result = this.filterKeys.filterKeys(dummyTokenData, [
          'access_token',
          'token_type',
          'expires_in',
          'refresh_token',
          'scope',
          'consent_valid_till',
          'id_token',
        ]);
        return result;
      }
    }
  }
}
