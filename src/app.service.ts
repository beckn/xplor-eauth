import { Injectable } from '@nestjs/common';
import { HealthCheckDto, ProviderDto } from './app.dto';
import { providers } from './common/provider';
import { digiLocker, googleAuth } from './utils/authlink';

@Injectable()
export class AppService {
  /**
   * Returns a greeting message.
   *
   * @returns A greeting message.
   */
  getHello(): HealthCheckDto {
    return {
      status: 'ok',
      version: '1.0.0',
      serverMessage: 'Server is up and running',
    };
  }

  /**
   * Retrieves provider information and updates the redirect URL based on the provider code.
   *
   * @returns An array of provider objects.
   */
  getProviders(): ProviderDto[] {
    // Iterate through each provider and update the redirect URL
    providers.forEach((provider) => {
      provider.redirectUrl = updateRedirectUrl(provider.code);
    });
    return providers;
  }
}

/**
 * Updates the redirect URL based on the provided provider code.
 *
 * @param code The code of the provider.
 * @returns The updated redirect URL.
 */
function updateRedirectUrl(code: string): string {
  switch (code) {
    case 'digilocker':
      return digiLocker();
    case 'googleAuth':
      return googleAuth();
    default:
      return '';
  }
}
