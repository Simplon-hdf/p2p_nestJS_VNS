import { Module } from '@nestjs/common';
import { TrainingController } from './training.controller';
import { TrainingService } from './training.service';
import { TrainingRepository } from './training.repository';
import { TagRepository } from 'src/tag/tag.repository';
import { ChapterRepository } from 'src/chapter/chapter.repository';

@Module({
  controllers: [TrainingController],
  providers: [TrainingService, TrainingRepository, TagRepository, ChapterRepository]
})
export class TrainingModule {}
