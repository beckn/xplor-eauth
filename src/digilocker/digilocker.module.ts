import { Module } from '@nestjs/common';

import { DigilockerService } from './digilocker.service';
import { DigilockerController } from './digilocker.controller';

/**
 * Module for managing interactions with Digilocker service.
 * This module provides controllers and services necessary for Digilocker integration.
 */
@Module({
  controllers: [DigilockerController], // Include DigilockerController as part of the module
  providers: [DigilockerService], // Include DigilockerService as part of the module
})
export class DigilockerModule {}
