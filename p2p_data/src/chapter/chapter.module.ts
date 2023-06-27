import { Module } from '@nestjs/common';
import { ChapterController } from './chapter.controller';
import { ChapterService } from './chapter.service';
import { ChapterRepository } from './chapter.repository';
import { TrainingRepository } from 'src/training/training.repository';

@Module({
  controllers: [ChapterController],
  providers: [ChapterService, ChapterRepository, TrainingRepository]
})
export class ChapterModule {}
