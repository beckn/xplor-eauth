import { ApiProperty } from '@nestjs/swagger';

export class AccessTokenEntity {
  @ApiProperty({ description: 'The access token string' })
  access_token: string;

  @ApiProperty({ description: 'The duration until the access token expires (in seconds)' })
  expires_in: number;

  @ApiProperty({ description: 'The type of token (e.g., Bearer)' })
  token_type: string;

  @ApiProperty({ description: 'The scope of the token' })
  scope: string;

  @ApiProperty({ description: 'The timestamp until the consent is valid (UNIX timestamp)' })
  consent_valid_till: number;

  @ApiProperty({ description: 'The ID token string' })
  id_token: string;
}

export class UserDetailsEntity {
  @ApiProperty({ description: 'The given name of the user' })
  given_name: string;

  @ApiProperty({ description: 'The preferred username of the user' })
  preferred_username: string;

  @ApiProperty({ description: 'The email address of the user' })
  email: string;

  @ApiProperty({ description: 'The birthdate of the user' })
  birthdate: string;

  @ApiProperty({ description: 'The phone number of the user' })
  phone_number: string;

  @ApiProperty({ description: "The user's single sign-on ID" })
  user_sso_id: string;

  @ApiProperty({ description: 'The PAN number of the user' })
  pan_number: string;

  @ApiProperty({ description: 'The driving licence number of the user' })
  driving_licence: string;

  @ApiProperty({ description: 'The masked Aadhaar number of the user' })
  masked_aadhaar: string;
}
export class UserDetailsResponse {
  @ApiProperty({ description: 'Details of the access token' })
  tokenDetails: AccessTokenEntity;

  @ApiProperty({ description: 'Details of the user' })
  userDetails: UserDetailsEntity;
}
