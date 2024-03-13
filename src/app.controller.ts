import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { HealthCheckDto, ProviderDto } from './app.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): HealthCheckDto {
    return this.appService.getHello();
  }

  @Get('/health')
  getHealth(): HealthCheckDto {
    return this.appService.getHello();
  }
  @Get('/providers')
  getProviders(): ProviderDto[] {
    return this.appService.getProviders();
  }
}
