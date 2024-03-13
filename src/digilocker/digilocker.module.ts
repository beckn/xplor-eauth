import { Module } from '@nestjs/common';
import { DigilockerService } from './digilocker.service';
import { DigilockerController } from './digilocker.controller';

@Module({
  controllers: [DigilockerController],
  providers: [DigilockerService],
})
export class DigilockerModule {}
