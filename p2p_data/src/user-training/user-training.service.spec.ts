import { Test, TestingModule } from '@nestjs/testing';
import { UserTrainingService } from './user-training.service';

describe('UserTrainingService', () => {
  let service: UserTrainingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserTrainingService],
    }).compile();

    service = module.get<UserTrainingService>(UserTrainingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
