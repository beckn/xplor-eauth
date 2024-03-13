import configuration from 'src/config/configuration';
import { v4 as uuidv4 } from 'uuid';

/**
 * Generates a DigiLocker authorization URL with the specified client ID, base URL, redirect URI, and state.
 *
 * @returns The DigiLocker authorization URL.
 */

export const digiLocker = (): string => {
  const baseUrl = configuration().digilocker_base_url;
  const clientId = configuration().digilocker_client_id;
  const state = uuidv4();
  const redirectUrl = configuration().digilocker_redirect_url;
  return `${baseUrl}/1/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUrl}&state=${state}&dl_flow=signup&scope=openid&amr=all&purpose=kyc`;
};

/**
 * Generates a Google OAuth 2.0 authorization URL with the specified client ID, redirect URI, and scope.
 *
 * @returns The Google OAuth 2.0 authorization URL.
 */

export const googleAuth = (): string => {
  const clientId = configuration().google_client_id;
  const redirectUri = configuration().digilocker_redirect_url;
  const scope = 'openid profile email https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/drive';

  return `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=code`;
};
