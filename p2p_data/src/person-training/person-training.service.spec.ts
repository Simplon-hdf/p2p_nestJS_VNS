import { Test, TestingModule } from '@nestjs/testing';
import { PersonTrainingService } from './person-training.service';

describe('PersonTrainingService', () => {
  let service: PersonTrainingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PersonTrainingService],
    }).compile();

    service = module.get<PersonTrainingService>(PersonTrainingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
