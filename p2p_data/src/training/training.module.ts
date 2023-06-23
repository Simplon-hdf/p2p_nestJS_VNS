import { Module } from '@nestjs/common';
import { TrainingController } from './training.controller';
import { TrainingService } from './training.service';
import { TrainingRepository } from './training.repository';

@Module({
  controllers: [TrainingController],
  providers: [TrainingService, TrainingRepository]
})
export class TrainingModule {}
