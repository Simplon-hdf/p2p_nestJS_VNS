import { Module } from '@nestjs/common';
import { LessonController } from './lesson.controller';
import { LessonService } from './lesson.service';
import { LessonRepository } from './lesson.repository';

@Module({
  controllers: [LessonController],
  providers: [LessonService, LessonRepository]
})
export class LessonModule {}
