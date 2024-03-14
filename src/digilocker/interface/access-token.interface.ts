/**
 * DTO (Data Transfer Object) representing the access token response.
 * This class encapsulates the structure of the access token JSON response.
 */
export class IAccessToken {
  access_token: string; // The access token string
  expires_in: number; // The duration until the access token expires (in seconds)
  token_type: string; // The type of token (e.g., Bearer)
  scope: string; // The scope of the token
  consent_valid_till: number; // The timestamp until the consent is valid (UNIX timestamp)
  id_token: string; // The ID token string
}
