import { Test, TestingModule } from '@nestjs/testing';
import { PermissonController } from './permisson.controller';

describe('PermissonController', () => {
  let controller: PermissonController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PermissonController],
    }).compile();

    controller = module.get<PermissonController>(PermissonController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
