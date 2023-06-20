import { Test, TestingModule } from '@nestjs/testing';
import { PermissonService } from './permisson.service';

describe('PermissonService', () => {
  let service: PermissonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PermissonService],
    }).compile();

    service = module.get<PermissonService>(PermissonService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
