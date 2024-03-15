import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';
import { IHealthCheck, IProvider } from './app.interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // Handler for the root endpoint
  @Get()
  getHello(): IHealthCheck {
    // Call the AppService to get the health check data
    return this.appService.getHello();
  }

  // Handler for the '/health' endpoint
  @Get('/health')
  getHealth(): IHealthCheck {
    // Call the AppService to get the health check data
    return this.appService.getHello();
  }

  // Handler for the '/providers' endpoint
  @Get('/providers')
  getProviders(): { success: boolean; data: IProvider[] } {
    // Call the AppService to get the list of providers
    const providers: IProvider[] = this.appService.getProviders();
    return { success: true, data: providers };
  }
}
