import { Test, TestingModule } from '@nestjs/testing';
import { UserTrainingController } from './user-training.controller';

describe('UserTrainingController', () => {
  let controller: UserTrainingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserTrainingController],
    }).compile();

    controller = module.get<UserTrainingController>(UserTrainingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
