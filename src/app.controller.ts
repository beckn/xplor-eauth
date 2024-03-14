import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';
import { HealthCheckDto, ProviderDto } from './app.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // Handler for the root endpoint
  @Get()
  getHello(): HealthCheckDto {
    // Call the AppService to get the health check data
    return this.appService.getHello();
  }

  // Handler for the '/health' endpoint
  @Get('/health')
  getHealth(): HealthCheckDto {
    // Call the AppService to get the health check data
    return this.appService.getHello();
  }

  // Handler for the '/providers' endpoint
  @Get('/providers')
  getProviders(): ProviderDto[] {
    // Call the AppService to get the list of providers
    return this.appService.getProviders();
  }
}
