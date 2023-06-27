import { Controller, Get, Post, Put, Param, Body, Delete } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { Lesson } from 'src/entities/lesson.entity';

@Controller('lesson')
export class LessonController {
    constructor(private readonly lessonService: LessonService) {}

    @Get()
    getAllLessons(){
        return this.lessonService.getAllLessons();
    }

    @Get('id/:id')
    getLessonById(@Param('id') lessonId : number) {
        return this.lessonService.getLessonById(lessonId);
    }

    @Get('search')
    searchByName(@Body('title') searchedTitle: string) {
        return this.lessonService.searchByName(searchedTitle);
    }

    @Post()
    async createLesson(
        @Body('title') title: string,
        @Body('goal') goal: string,
        @Body('subject') subject: string
        ) : Promise<Lesson> {
        return this.lessonService.createLesson(title, goal, subject);
    }

    @Put(':id')
    async updateLesson(
        @Param('id') lessonID: number,
        @Body('title') title: string,
        @Body('goal') goal: string,
        @Body('subject') subject: string,
        @Body('isActive') isActive: boolean
    ) : Promise<Lesson> {
        return this.lessonService.updateLesson(lessonID, title, goal, subject, isActive);
    }

    @Delete(':id')
    deleteLesson(@Param('id') lessonID: number){
        return this.lessonService.deleteLesson(lessonID);
    }
}
