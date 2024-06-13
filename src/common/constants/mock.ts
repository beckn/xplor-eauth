import { dummyData } from './dummy-response';

export const mockDigiProvider = {
  data: {
    code: 'digilocker',
    iconLink: 'https://example.com/icon1.png',
    redirectUrl:
      'https://digilocker.meripehchaan.gov.in/public/oauth2/1/authorize?response_type=code&client_id=PHD5C96DF5&state=undefined undefined&redirect_uri=https://xplor-core-nest-dev.thewitslab.com/e-auth/callback&code_challenge=MGViYmVkNzU4ZDNhY2ZjNmUyZWExOWU2Mzc2ZmNhMmZlZDc2N2IxNzE3MjI4YjJlYTJjOWRmNjhlMGNiZDAwZg&code_challenge_method=S256&scope=address+careof+openid',
    subTitle: 'Sub Title 1',
    title: 'Provider 1',
  },
  message: 'OK',
  success: true,
};

export const mockedUserDetails = {
  tokenDetails: {
    access_token: 'bc125c212a4b03a9a188a858be5a163f379e878a',
    consent_valid_till: 1684731048,
    expires_in: 3600,
    id_token: dummyData.id_token,
    scope: 'openid files.issueddocs partners.PANCR partners.DRVLC',
    token_type: 'Bearer',
    refresh_token: 'a47ab18c593703e4f83a274694db7422a8cfcb8f',
  },
  userDetails: {
    birthdate: '01/01/1990',
    driving_licence: 'DL01202200000001',
    email: 'ajit.kumar@digilocker.giv.in',
    given_name: 'Ajit Kumar',
    masked_aadhaar: 'xxxxxxx1234',
    pan_number: 'ABCDK1232G',
    phone_number: '9876543210',
    preferred_username: 'ajit.dl',
    user_sso_id: 'DL-93f3390c-6d92-11e9-a85e-9457a5645069',
    digilockerid: '123e4567-e89b-12d3-a456-426655440000',
    verified: true,
  },
};
export const mockedFailures = {
  error: 'invalid_grant',
  error_description: "Authorization code doesn't exist or is invalid for the client",
};

export const mockedRefreshToken = {
  access_token: 'bc125c212a4b03a9a188a858be5a163f379e878a',
  token_type: 'Bearer',
  expires_in: 3600,
  refresh_token: 'a47ab18c593703e4f83a274694db7422a8cfcb8f',
  digilockerid: '123e4567-e89b-12d3-a456-426655440000',
  scope: 'files.issueddocs partners.PANCR partners.DRVLC',
  consent_valid_till: 1684731048,
};
export const mockedToken = {
  access_token: 'bc125c212a4b03a9a188a858be5a163f379e878a',
  token_type: 'Bearer',
  expires_in: 3600,
  refresh_token: 'a47ab18c593703e4f83a274694db7422a8cfcb8f',
  scope: 'files.issueddocs partners.PANCR partners.DRVLC',
  consent_valid_till: 1684731048,
};
