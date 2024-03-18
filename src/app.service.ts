import { Injectable } from '@nestjs/common';

import { IHealthCheck, IProvider } from './app.interface';
import { providers } from './common/provider';
import { EAuth } from './utils/authlink';

@Injectable()
export class AppService {
  private auth: EAuth;

  constructor() {
    // Initialize the authentication utility
    this.auth = new EAuth();
  }

  /**
   * Returns a greeting message indicating the status of the server.
   *
   * @returns A HealthCheckDto object representing the status of the server.
   */
  getHello(): IHealthCheck {
    return {
      status: 'ok',
      version: '1.0.0',
      serverMessage: 'Server is up and running',
    };
  }

  /**
   * Retrieves provider information and updates the redirect URL based on the provider code.
   *
   * @returns An array of ProviderDto objects representing the available providers with updated redirect URLs.
   */
  getProviders(): IProvider[] {
    // Iterate through each provider and update the redirect URL
    providers.forEach((provider) => {
      provider.redirectUrl = this.updateRedirectUrl(provider.code);
    });
    return providers;
  }

  /**
   * Updates and returns the redirect URL based on the provider code.
   *
   * @param code The code representing the provider.
   * @returns The updated redirect URL.
   */
  private updateRedirectUrl(code: string): string {
    switch (code) {
      case 'digilocker':
        // Generate the redirect URL for Digilocker authentication
        return this.auth.digiLocker();
      case 'googleAuth':
        // Generate the redirect URL for Google authentication
        return this.auth.googleAuth();
      default:
        // If the provider code is not recognized, return an empty string
        return '';
    }
  }
}
