import { Module } from '@nestjs/common';
import { ChapterController } from './chapter.controller';
import { ChapterService } from './chapter.service';
import { ChapterRepository } from './chapter.repository';
import { LessonRepository } from '../lesson/lesson.repository';
import { TagRepository } from '../tag/tag.repository';

@Module({
  controllers: [ChapterController],
  providers: [ChapterService, ChapterRepository, LessonRepository, TagRepository]
})
export class ChapterModule {}
