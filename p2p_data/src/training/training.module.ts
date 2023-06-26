import { Module } from '@nestjs/common';
import { TrainingController } from './training.controller';
import { TrainingService } from './training.service';
import { TrainingRepository } from './training.repository';
import { TagRepository } from 'src/tag/tag.repository';

@Module({
  controllers: [TrainingController],
  providers: [TrainingService, TrainingRepository, TagRepository]
})
export class TrainingModule {}
