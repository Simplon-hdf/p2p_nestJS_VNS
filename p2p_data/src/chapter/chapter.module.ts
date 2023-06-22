import { Module } from '@nestjs/common';
import { ChapterController } from './chapter.controller';
import { ChapterService } from './chapter.service';
import { ChapterRepository } from './chapter.repository';

@Module({
  controllers: [ChapterController],
  providers: [ChapterService, ChapterRepository]
})
export class ChapterModule {}
