import { Test, TestingModule } from '@nestjs/testing';
import { PersonTrainingController } from './person-training.controller';

describe('PersonTrainingController', () => {
  let controller: PersonTrainingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PersonTrainingController],
    }).compile();

    controller = module.get<PersonTrainingController>(PersonTrainingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
