/**
 * DTO (Data Transfer Object) representing the access token response.
 * This class encapsulates the structure of the access token JSON response.
 */
export interface IAccessToken {
  access_token: string; // The access token string
  expires_in: number; // The duration until the access token expires (in seconds)
  token_type: string; // The type of token (e.g., Bearer)
  scope: string; // The scope of the token
  consent_valid_till: number; // The timestamp until the consent is valid (UNIX timestamp)
  id_token?: string; // The ID token string
  refresh_token?: string; // The refresh token string
  digilockerid?: string; // The Digilocker ID
}

/**
 * Interface representing the structure of access token data received from a source.
 * This interface defines the properties expected in the access token data object.
 */
export interface IAccessTokenData {
  /** The access token string used for authentication. */
  access_token: string;

  /** The duration in seconds for which the access token is valid. */
  expires_in: number;

  /** The type of token. Usually "Bearer". */
  token_type: string;

  /** The scope or permissions associated with the access token. */
  scope: string;

  /** Unix timestamp indicating when the user's consent is valid until. */
  consent_valid_till: number;

  /** The refresh token string used for obtaining a new access token when it expires. */
  refresh_token: string;

  /** The unique ID associated with the user's Digilocker account. */
  digilockerid: string;

  /** The name of the user associated with the account. */
  name: string;

  /** The date of birth of the user in the format DDMMYYYY. */
  dob: string;

  /** The gender of the user (M/F/O for Male/Female/Other). */
  gender: string;

  /** Indicates whether the user has an e-Aadhaar document linked to their account. */
  eaadhaar: string;

  /** Indicates whether this is a new account. */
  new_account: string;

  /** A unique reference key associated with the user's account. */
  reference_key: string;
}

export interface IAccessRereshTokenData {
  /** The access token string used for authentication. */
  access_token: string;

  /** The duration in seconds for which the access token is valid. */
  expires_in: number;

  /** The type of token. Usually "Bearer". */
  token_type: string;

  /** The scope or permissions associated with the access token. */
  scope: string;

  /** Unix timestamp indicating when the user's consent is valid until. */
  consent_valid_till: number;

  /** The refresh token string used for obtaining a new access token when it expires. */
  refresh_token: string;
}
