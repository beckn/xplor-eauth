import { Test, TestingModule } from '@nestjs/testing';
import { DigilockerController } from './digilocker.controller';
import { DigilockerService } from './digilocker.service';

describe('DigilockerController', () => {
  let controller: DigilockerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DigilockerController],
      providers: [DigilockerService],
    }).compile();

    controller = module.get<DigilockerController>(DigilockerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
