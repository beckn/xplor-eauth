import { Test, TestingModule } from '@nestjs/testing';
import { DigilockerService } from './digilocker.service';

describe('DigilockerService', () => {
  let service: DigilockerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DigilockerService],
    }).compile();

    service = module.get<DigilockerService>(DigilockerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
