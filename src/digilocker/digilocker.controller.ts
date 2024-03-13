import { Controller } from '@nestjs/common';
import { DigilockerService } from './digilocker.service';

@Controller('digilocker')
export class DigilockerController {
  constructor(private readonly digilockerService: DigilockerService) {}
}
