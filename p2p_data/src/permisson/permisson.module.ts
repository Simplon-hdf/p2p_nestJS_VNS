import { Module } from '@nestjs/common';
import { PermissonController } from './permisson.controller';
import { PermissonService } from './permisson.service';

@Module({
  controllers: [PermissonController],
  providers: [PermissonService]
})
export class PermissonModule {}
