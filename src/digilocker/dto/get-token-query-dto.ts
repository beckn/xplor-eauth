import { IsNotEmpty, IsString } from 'class-validator';

/**
 * DTO (Data Transfer Object) representing the query parameters for fetching user details.
 * This class ensures that the 'refresh_token' parameter is present and is a string.
 */
export class GetTokenQueryDto {
  @IsNotEmpty()
  @IsString()
  refresh_token: string; // The access token received from client side.
}
