import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';
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
  async digiLocker(userId: string) {
    // Retrieve necessary configuration values
    const baseUrl = this.config.get<string>('DIGILOCKER_BASE_URL').replaceAll(' ', '');
    const clientId = this.config.get<string>('DIGILOCKER_CLIENT_ID').replaceAll(' ', '');
    const codeChallengeMethod = this.config.get<string>('CODE_CHALLENGE_METHOD').replaceAll(' ', '');
    const scope = this.config.get<string>('DIGILOCKER_SCOPE');
    const redirectUrl = this.config.get<string>('DIGILOCKER_REDIRECT_URL').replaceAll(' ', '');
    const codeChallenge = await this.generate_code_challenge(userId);
    if (codeChallenge) {
      return `${baseUrl}/1/authorize?response_type=code&client_id=${clientId}&state=${userId}&redirect_uri=${redirectUrl}&code_challenge=${codeChallenge}&code_challenge_method=${codeChallengeMethod}&scope=${scope}`;
    }
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

  async generate_code_challenge(code_verifier: string): Promise<string> {
    // Generate SHA256 hash of the code verifier
    const sha256_hash = crypto.subtle.digest('SHA-256', new TextEncoder().encode(code_verifier));
    // Base64URL encode the SHA256 hash without padding
    return await sha256_hash.then((buffer) => {
      const hashArray = Array.from(new Uint8Array(buffer));
      const hashHex = hashArray.map((byte) => ('00' + byte.toString(16)).slice(-2)).join('');
      return this.base64_url_encode_without_padding(hashHex);
    });
  }
  base64_url_encode_without_padding(arg: string) {
    // Regular base64 encoder with padding
    let s = btoa(arg);
    // Remove any trailing '='
    s = s.replace(/=/g, '');
    // Replace '+' with '-'
    s = s.replace(/\+/g, '-');
    // Replace '/' with '_'
    s = s.replace(/\//g, '_');
    return s;
  }
}
