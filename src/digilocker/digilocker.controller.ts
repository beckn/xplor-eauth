import { Controller, Get, Query } from '@nestjs/common';
import { ApiResponse, ApiQuery, ApiTags } from '@nestjs/swagger';

import { DigilockerService } from './digilocker.service';
import { GetUserQueryDto } from './dto/get-user-query.dto';
import { AccessTokenEntity, UserDetailsResponse } from './digilocker.entity';
import { GetTokenQueryDto } from './dto/get-token-query-dto';

@ApiTags('Digilocker')
@Controller('digilocker')
export class DigilockerController {
  constructor(private readonly digilockerService: DigilockerService) {}

  /**
   * Endpoint to fetch user details from Digilocker.
   * @param req The request object containing the query parameters.
   * @param code The code received from Digilocker authorization.
   * @returns Object containing user details fetched from Digilocker, wrapped in a success status.
   */
  @Get('/get-user-details')
  @ApiQuery({ name: 'code', type: String })
  @ApiResponse({
    status: 200,
    description: 'Returns the list of providers.',
    type: UserDetailsResponse, // Assuming IProvider is an interface or model representing the provider data
  })
  async getUserDetails(@Query() code: GetUserQueryDto): Promise<any> {
    try {
      // Return the user details along with success status
      return await this.digilockerService.getUserDetails(code);
    } catch (error) {
      // If an error occurs, return a failed response along with the error data
      return error.message;
    }
  }

  @Get('/get-access-token')
  @ApiQuery({ name: 'refresh_token', type: String })
  @ApiResponse({
    status: 200,
    description: 'Returns the list of providers.',
    type: AccessTokenEntity, // Assuming IProvider is an interface or model representing the provider data
  })
  async getAcessToken(@Query() refresh_token: GetTokenQueryDto): Promise<any> {
    try {
      // Return the user details along with success status
      return await this.digilockerService.getRefreshAccessToken(refresh_token);
    } catch (error) {
      // If an error occurs, return a failed response along with the error data
      return error.message;
    }
  }
}