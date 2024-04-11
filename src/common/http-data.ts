import { ConfigService } from '@nestjs/config';

import { GetTokenQueryDto } from 'src/digilocker/dto/get-token-query-dto';
import { GetUserQueryDto } from 'src/digilocker/dto/get-user-query.dto';

/**
 * Helper class for constructing data for HTTP requests related to Digilocker API.
 */
export class HttpData {
  private config: ConfigService;

  /**
   * Constructor to initialize the ConfigService instance.
   */
  constructor() {
    this.config = new ConfigService();
  }

  /**
   * Constructs data for obtaining an access token using the authorization code flow.
   * @param code The authorization code received from Digilocker authorization callback.
   * @returns URLSearchParams containing the required parameters for access token request.
   */
  tokenData(code: GetUserQueryDto) {
    // Get configuration values
    const clientId = this.config.get<string>('DIGILOCKER_CLIENT_ID');
    const clientSecret = this.config.get<string>('DIGILOCKER_SECRET');
    const redirectUri = this.config.get<string>('DIGILOCKER_REDIRECT_URL');
    const codeVerifier = this.config.get<string>('CODE_VERIFIER');

    // Construct data for access token request
    const data = new URLSearchParams();
    data.append('client_id', clientId);
    data.append('client_secret', clientSecret);
    data.append('code', code.code);
    data.append('grant_type', 'authorization_code');
    data.append('redirect_uri', redirectUri);
    data.append('code_verifier', codeVerifier);

    return data;
  }

  /**
   * Constructs data for obtaining a new access token using a refresh token.
   * @param refreshToken The refresh token used to obtain a new access token.
   * @returns URLSearchParams containing the required parameters for access token refresh request.
   */
  accessTokenData(refreshToken: GetTokenQueryDto) {
    // Construct data for access token refresh request
    const data = new URLSearchParams();
    data.append('grant_type', 'refresh_token');
    data.append('refresh_token', refreshToken as unknown as string);

    return data;
  }
}
