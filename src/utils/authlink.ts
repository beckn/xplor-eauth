import { ConfigService } from '@nestjs/config';
import { v4 as uuidv4 } from 'uuid';

export class EAuth {
  private config: ConfigService;

  constructor() {
    this.config = new ConfigService();
  }

  /**
   * Generates a DigiLocker authorization URL with the specified client ID, base URL, redirect URI, and state.
   *
   * @returns The DigiLocker authorization URL.
   */
  digiLocker(): string {
    // Retrieve necessary configuration values
    const baseUrl = this.config.get<string>('DIGILOCKER_BASE_URL');
    const clientId = this.config.get<string>('DIGILOCKER_CLIENT_ID');
    const codeChallenge = this.config.get<string>('CODE_CHALLENGE');
    const codeChallengeMethod = this.config.get<string>('CODE_CHALLENGE_METHOD');
    const scope = this.config.get<string>('DIGILOCKER_SCOPE');

    const state = uuidv4();
    const redirectUrl = this.config.get<string>('DIGILOCKER_REDIRECT_URL');

    // Construct and return the DigiLocker authorization URL
    return `${baseUrl}/1/authorize?response_type=code&client_id=${clientId}&state=${state}&redirect_uri=${redirectUrl}&code_challenge=${codeChallenge}&code_challenge_method=${codeChallengeMethod}&scope=${scope}`;
  }
  /**
   * Generates a Google OAuth 2.0 authorization URL with the specified client ID, redirect URI, and scope.
   *
   * @returns The Google OAuth 2.0 authorization URL.
   */
  googleAuth = (): string => {
    // Retrieve necessary configuration values
    const clientId = this.config.get<string>('GOOGLE_CLIENT_ID');
    const redirectUri = this.config.get<string>('DIGILOCKER_REDIRECT_URL');
    const scope = 'openid profile email https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/drive';

    // Construct and return the Google OAuth 2.0 authorization URL
    return `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=code`;
  };
}
