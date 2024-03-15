import { Controller, Get, Query } from '@nestjs/common';
import { DigilockerService } from './digilocker.service';

import { GetUserQueryDto } from './dto/get-user-query.dto';

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
  async getUserDetails(@Query() code: GetUserQueryDto): Promise<{ success: boolean; data: any }> {
    try {
      // Call the Digilocker service to get user details
      const userDetails = await this.digilockerService.getUserDetails(code);
      // Return the user details along with success status
      return {
        success: true,
        data: await userDetails,
      };
    } catch (error) {
      // If an error occurs, return a failed response along with the error data
      return {
        success: false,
        data: error.message,
      };
    }
  }
}
