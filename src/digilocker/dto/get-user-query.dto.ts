import { IsNotEmpty, IsString } from 'class-validator';

/**
 * DTO (Data Transfer Object) representing the query parameters for fetching user details.
 * This class ensures that the 'code' parameter is present and is a string.
 */
export class GetUserQueryDto {
  @IsNotEmpty()
  @IsString()
  code: string; // The authorization code received from Digilocker authorization api
}
