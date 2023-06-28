import { Controller, Get, Post, Put, Param, Body, Delete } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { Lesson } from 'src/entities/lesson.entity';

@Controller('lesson')
export class LessonController {
    constructor(private readonly lessonService: LessonService) {}

    //#region 

    /**
     * Get All Lessons
     * @returns a LIST off Lessons OBJECTS who comes from Service
     */
    @Get()
    getAllLessons(){
        return this.lessonService.getAllLessons();
    }

    /**
     * Get ONE Lesson by ID
     * @param lessonId (Lesson's Id to search who comes from URL)
     * @returns one Lesson OBJECT who comes from Service
     */
    @Get('id/:id')
    getLessonById(@Param('id') lessonId : number) {
        return this.lessonService.getLessonById(lessonId);
    }

    /**
     * Get Lesson by name
     * @param searchedTitle (the piece of string to find and who comes from the Body request)
     * @returns a LIST of Lessons who comes from Service
     */
    @Get('search')
    searchByName(@Body('title') searchedTitle: string) {
        return this.lessonService.searchByName(searchedTitle);
    }
    //#endregion

    /**
     * Post a NEW Lesson
     * @param title (the title who comes from the request body)
     * @param goal (the goal who comes from the request body)
     * @param subject (the subject who comes from the request body)
     * @param chaptersIds (the chapter's Ids list who comes from the request body)
     * @returns the new Lesson OBJECT who comes from Service
     */
    @Post()
    async createLesson(
        @Body('title') title: string,
        @Body('goal') goal: string,
        @Body('subject') subject: string,
        @Body('chapters') chaptersIds: number[]
        ) : Promise<Lesson> {
        return this.lessonService.createLesson(title, goal, subject, chaptersIds);
    }

    /**
     * Update a Lesson by Id
     * @param lessonID (the Lesson Id who comes from URL)
     * @param title (the title who comes from the request body)
     * @param goal (the goal who comes from the request body)
     * @param subject (the subject who comes from the request body)
     * @param chaptersIds (the chapter's Ids list who comes from the request body)
     * @returns the new Lesson OBJECT who comes from Service
     */
    @Put(':id')
    async updateLesson(
        @Param('id') lessonID: number,
        @Body('title') title: string,
        @Body('goal') goal: string,
        @Body('subject') subject: string,
        @Body('isActive') isActive: boolean,
        @Body('chapters') chaptersIds: number[]
    ) : Promise<Lesson> {
        return this.lessonService.updateLesson(lessonID, title, goal, subject, isActive, chaptersIds);
    }

    /**
     * Delete one Lesson By Id
     * @param lessonID (the Lesson's Id who comes from URL)
     * @returns a STRING who comes from Service
     */
    @Delete(':id')
    deleteLesson(@Param('id') lessonID: number){
        return this.lessonService.deleteLesson(lessonID);
    }
}
