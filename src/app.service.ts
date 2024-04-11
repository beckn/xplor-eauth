import { Injectable } from '@nestjs/common';

import { IHealthCheck } from './app.interface';
import { providers } from './common/provider';
import { EAuth } from './utils/authlink';
import { Request } from 'express';

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
  async getProviders(req: Request) {
    // Iterate through each provider and update the redirect URL
    const [type, token] = req.headers.authorization?.split(' ') ?? [];

    providers[0].redirectUrl = await this.updateRedirectUrl('digilocker', `${type} ${token}`);

    return providers[0];
  }

  /**
   * Updates and returns the redirect URL based on the provider code.
   *
   * @param code The code representing the provider.
   * @returns The updated redirect URL.
   */
  private async updateRedirectUrl(code: string, userId) {
    switch (code) {
      case 'digilocker':
        // Generate the redirect URL for Digilocker authentication
        return await this.auth.digiLocker(userId);
      case 'googleAuth':
        // Generate the redirect URL for Google authentication

        return this.auth.googleAuth();
      default:
        // If the provider code is not recognized, return an empty string
        return Promise.resolve('');
    }
  }
}
