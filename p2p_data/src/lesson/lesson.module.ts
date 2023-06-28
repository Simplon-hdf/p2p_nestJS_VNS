import { Module } from '@nestjs/common';
import { LessonController } from './lesson.controller';
import { LessonService } from './lesson.service';
import { LessonRepository } from './lesson.repository';
import { ChapterRepository } from '../chapter/chapter.repository';
import { TagRepository } from '../tag/tag.repository';
// import { PersonLessonRepository } from '../person-lesson/personLesson.repository';

@Module({
  controllers: [LessonController],
  providers: [LessonService, LessonRepository, ChapterRepository, TagRepository]
})
export class LessonModule {}
