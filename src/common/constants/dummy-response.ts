import { IAccessToken, IAccessTokenData } from 'src/digilocker/interface/access-token.interface';

/**
 * Dummy data representing an access token.
 * This data is used for testing purposes.
 */
export const dummyData: IAccessToken = {
  access_token: 'bc125c212a4b03a9a188a858be5a163f379e878a',
  expires_in: 3600,
  token_type: 'Bearer',
  scope: 'openid files.issueddocs partners.PANCR partners.DRVLC',
  consent_valid_till: 1684731048,
  id_token:
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IjVmOWRkNjI3ZDRlNDVlNmM5OGV' +
    'iZGJkOWU5YmIxMzI0In0.eyJpc3MiOiJodHRwczpcL1wvYXBpLmRpZ2l0YWxsb2NrZXIuZ29' +
    '2LmluIiwic3ViIjoiYWppdC5kbCIsImF1ZCI6IkFCQ0RFRkdIIiwiaWF0IjoxNjU0MTQ1OTc' +
    '1LCJleHAiOjE2NTQyMzIzNzUsImF1dGhfdGltZSI6MTY1NDE0NTk3NSwiZ2l2ZW5fbmFtZSI' +
    '6IkFqaXQgS3VtYXIiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJhaml0LmRsIiwiZW1haWwiOiJ' +
    'haml0Lmt1bWFyQGRpZ2lsb2NrZXIuZ2l2LmluIiwiYmlydGhkYXRlIjoiMDFcLzAxXC8xOTk' +
    'wIiwicGhvbmVfbnVtYmVyIjoiOTg3NjU0MzIxMCIsImp0aSI6IjNmZmQ5OGQzLTAzMjEtNDQ' +
    'xYS1iMmVhLTE4YTY2ZDU1YWEwYiIsInVzZXJfc3NvX2lkIjoiREwtOTNmMzM5MGMtNmQ5Mi0' +
    'xMWU5LWE4NWUtOTQ1N2E1NjQ1MDY5IiwicGFuX251bWJlciI6IkFCQ0RLMTIzMkciLCJkcml' +
    '2aW5nX2xpY2VuY2UiOiJETDAxMjAyMjAwMDAwMDAxIiwibWFza2VkX2FhZGhhYXIiOiJ4eHh' +
    '4eHh4MTIzNCJ9.ZNfwZpf4ws7btEHxpRV9sOTRDR1g4CpnQEJi3VXLbdYrvDEwLyGpnQ8uQ9' +
    'g1cq_mTmv11K2scaRd16Cg9AKBl51FVuXW4_WJC7CmIOz4Ys9YJf_m4NU3v4mVaDDOjLV6RHX9G6uHtS9Llemek-8yIE4rjcjUabq0vlC5JkclAcYcRY7pTGm0BKRQU4OSktKFcR_X5b7dnwU08qJkpeCsL9B72gbCAdxLK8ZQp6npjX0BZU8ocieRaARS_5MjpAJVkNAwgUQ0rv_nwh15jG9P9bjGmVVn6djlBZ_PWJbLcxtfJEUFSeMupv',
};

/**
 * This constant represents dummy token data conforming to the IAccessTokenData interface..
 * This data is used for testing purposes.
 */
export const dummyTokenData: IAccessTokenData = {
  // Access token issued by the authentication server.
  access_token: 'bc125c212a4b03a9a188a858be5a163f379e878a',

  // Time in seconds after which the access token expires.
  expires_in: 3600,

  // Type of token, typically "Bearer" for OAuth2.
  token_type: 'Bearer',

  // Scope of access granted by the token.
  scope: 'files.issueddocs partners.PANCR partners.DRVLC',

  // Unix timestamp representing the expiration time of user consent.
  consent_valid_till: 1684731048,

  // Refresh token used to obtain a new access token when the current one expires.
  refresh_token: 'a47ab18c593703e4f83a274694db7422a8cfcb8f',

  // Unique identifier associated with the user's Digilocker account.
  digilockerid: '123e4567-e89b-12d3-a456-426655440000',

  // Name of the user associated with the token.
  name: 'Ajit Kumar',

  // Date of birth of the user (in the format DDMMYYYY).
  dob: '31121970',

  // Gender of the user.
  gender: 'M',

  // Indicates whether the user's Aadhaar card is linked to their Digilocker account.
  eaadhaar: 'Y',

  // Indicates whether the user has a new account.
  new_account: 'Y',

  // Reference key associated with the user's account.
  reference_key: '2a33349e7e606a8ad2e30e3c84521f9377450cf09083e162e0a9b1480ce0f972',
};
