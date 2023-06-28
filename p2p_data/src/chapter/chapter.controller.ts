import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ChapterService } from './chapter.service';
import { Chapter } from 'src/entities/chapter.entity';

@Controller('chapter')
export class ChapterController {
    constructor(private readonly chapterService: ChapterService) {}

    //#region GET

    /**
     * Get ALL Chapters
     * @returns a LIST off Chapters OBJECTS whom comes from Service
     */
    @Get()
    getAllChapters() {
        return this.chapterService.getAllChapters();
    }

    /**
     * Get ONE Chapter by ID
     * @param chapterId (Chapter's Id to search who comes from URL)
     * @returns one Chapter OBJECT who comes from Service
     */
    @Get('id/:id')
    getChapterById(@Param('id') chapterId : number) {
        return this.chapterService.getChapterById(chapterId);
    }

    /**
     * Get Trainings for one Chapter
     * @param chapterId (Chapter's Id who comes from Service and for find his trainings)
     * @returns a LIST of trainings OBJECTS who comes from Service
     */
    @Get('trainings/:id')
    getLinkedTrainings(@Param('id') chapterId : number) {
        return this.chapterService.getLinkedTrainings(chapterId);
    }

    /**
     * Get Chapter by name
     * @param searchedTitle (the piece of string to find who comes from the Body request)
     * @returns a LIST of Chapters who comes from Service
     */
    @Get('search')
    searchByName(@Body('title') searchedTitle: string) {
        return this.chapterService.searchByName(searchedTitle);
    }
    //#endregion

    /**
     * Post a NEW Chapter
     * @param title (the title who comes from the request body)
     * @param description (the description who comes from the request body)
     * @param duration (the duration who comes from the request body)
     * @param lessonsIds (a list of lessons Ids who comes from the request body)
     * @Body (the request body)
     * @returns the new Chapter OBJECT who comes from Service
     */
    @Post()
    async createChapter(
        @Body('title') title: string,
        @Body('description') description: string,
        @Body('duration') duration: number,
        @Body('lessons') lessonsIds: number[]
    ) : Promise<Chapter> {
        const generatedChapter = await this.chapterService.createChapter(title, description, duration, lessonsIds);
        return generatedChapter;
    }

    /**
     * Update a chapter by Id
     * @param chapterId (the Id chapter who comes from the URL)
     * @param title (the title who comes from the request body)
     * @param description (the description who comes from the request body)
     * @param duration (the duration who comes from the request body)
     * @param isActive (the isActive who comes from the request body)
     * @param trainingsId (the Ids Trainings LIST who comes from the request body)
     * @param lessonsIds (the Ids Lessons LIST who comes from the request body)
     * @Body (the request body)
     * @returns the updated Chapter OBJECT who comes from Service
     */
    @Put(':id')
    async updateChapter(
        @Param('id') chapterId: number,
        @Body('title') title: string,
        @Body('description') description: string,
        @Body('duration') duration: number,
        @Body('isActive') isActive: boolean,
        @Body('trainings') trainingsId: number[],
        @Body('lessons') lessonsIds: number[]
        ) : Promise<Chapter> {
        const updatedChapter = await this.chapterService.updateChapter(
            chapterId, 
            title, 
            description, 
            duration, 
            isActive, 
            trainingsId,
            lessonsIds
        );

        return updatedChapter;
    }

    /**
     * Delete one Chapter By Id
     * @param chapterId (the chapter's Id who comes from URL)
     * @returns a STRING who comes from Service
     */
    @Delete(':id')
    deleteChapter(@Param('id') chapterId: number){
        return this.chapterService.deleteChapter(chapterId);
    }

}
