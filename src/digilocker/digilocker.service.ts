import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

import { dummyData } from './../common/constants/dummy-response';
import { JwtDecoder } from './../utils/jwtdecoder';
import { IBasicUserDetails } from './interface/user-details.interface';
import { GetUserQueryDto } from './dto/get-user-query.dto';

@Injectable()
export class DigilockerService {
  private http: HttpService;
  private config: ConfigService;
  private jwtDecoder: JwtDecoder;

  constructor() {
    // Initialize dependencies
    (this.http = new HttpService()), (this.config = new ConfigService()), (this.jwtDecoder = new JwtDecoder());
  }

  /**
   * Retrieves user details from Digilocker based on the provided code.
   * @param code The code received from Digilocker authorization.
   * @returns User details from Digilocker.
   */
  async getUserDetails(code: GetUserQueryDto): Promise<any> {
    // Get configuration values
    const url = this.config.get<string>('DIGILOCKER_BASE_URL') + '/2/token';
    const clientId = this.config.get<string>('DIGILOCKER_CLIENT_ID');
    const clientSecret = this.config.get<string>('DIGILOCKER_SECRET');
    const redirectUri = this.config.get<string>('DIGILOCKER_REDIRECT_URL');

    // Construct form data
    const data = new URLSearchParams();
    data.append('client_id', clientId);
    data.append('client_secret', clientSecret);
    data.append('code', code.code);
    data.append('grant_type', 'authorization_code');
    data.append('redirect_uri', redirectUri);

    // Configure HTTP request
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };

    try {
      // Send HTTP request to Digilocker
      const response = await firstValueFrom(this.http.post(url, data, config));
      return response.data;
    } catch (error) {
      // Handle errors
      if (error.code === 'ERR_BAD_REQUEST') {
        // Use dummy data for testing
        const data = dummyData;
        // Decode JWT token from dummy data
        const userDetails: IBasicUserDetails = this.jwtDecoder.decodeToken(data.id_token);
        // Return token details and user details
        return {
          tokenDetails: data,
          userDetails: userDetails,
        };
      }
    }
  }
}
