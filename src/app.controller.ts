import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { AppService } from './app.service';
import { IHealthCheck, IProvider } from './app.interface';
import { HealthCheckEntity, ProviderEntity } from './app.entity';

@ApiTags('Eauth Providers API')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // Handler for the root endpoint
  @Get()
  @ApiResponse({
    status: 200,
    description: 'Returns a greeting message indicating the health status of the server.',
    type: HealthCheckEntity,
  })
  getHello(): IHealthCheck {
    // Call the AppService to get the health check data
    return this.appService.getHello();
  }

  // Handler for the '/health' endpoint
  @Get('/health')
  @ApiResponse({
    status: 200,
    description: 'Returns a greeting message indicating the health status of the server.',
    type: HealthCheckEntity,
  })
  @ApiResponse({
    status: 200,
    description: 'Returns a greeting message indicating the health status of the server.',
    type: HealthCheckEntity, // Assuming HealthCheck is the interface or model representing the health check data
  })
  getHealth(): IHealthCheck {
    // Call the AppService to get the health check data
    return this.appService.getHello();
  }

  // Handler for the '/providers' endpoint
  @Get('/providers')
  @ApiResponse({
    status: 200,
    description: 'Returns the list of providers.',
    type: [ProviderEntity], // Assuming IProvider is an interface or model representing the provider data
  })
  getProviders(): IProvider[] {
    // Call the AppService to get the list of providers
    return this.appService.getProviders();
  }
}
