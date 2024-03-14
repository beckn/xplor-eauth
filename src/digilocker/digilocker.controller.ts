import { Controller, Post, Query, Req } from '@nestjs/common';
import { DigilockerService } from './digilocker.service';
import { Request } from 'express';

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
  @Post('/get-user-details')
  async getUserDetails(@Req() req: Request, @Query() code: GetUserQueryDto): Promise<{ success: boolean; data: any }> {
    try {
      // Call the Digilocker service to get user details
      const userDetails = await this.digilockerService.getUserDetails(code);
      // Return the user details along with success status
      return {
        success: true,
        data: userDetails,
      };
    } catch (error) {
      // If an error occurs, return a failed response along with the error data
      return {
        success: false,
        data: error.response.data,
      };
    }
  }
}
