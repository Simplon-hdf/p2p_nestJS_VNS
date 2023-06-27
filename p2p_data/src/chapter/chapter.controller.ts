import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ChapterService } from './chapter.service';
import { Chapter } from 'src/entities/chapter.entity';

@Controller('chapter')
export class ChapterController {
    constructor(private readonly chapterService: ChapterService) {}

    //#region Get Methods
    @Get()
    getAllChapters(){
        return this.chapterService.getAllChapters();
    }

    @Get('id/:id')
    getChapterById(@Param('id') chapterId : number) {
        return this.chapterService.getChapterById(chapterId);
    }

    @Get('trainings/:id')
    getChapterLinkedTrainings(@Param('id') chapterId : number) {
        return this.chapterService.getChapterLinkedTrainings(chapterId);
    }

    @Get('search')
    searchByName(@Body('title') searchedTitle: string) {
        return this.chapterService.searchByName(searchedTitle);
    }
    //#endregion

    @Post()
    async createChapter(
        @Body('title') title: string,
        @Body('description') description: string,
        @Body('duration') duration: number
    ) : Promise<Chapter> {
        const generatedChapter = await this.chapterService.createChapter(title, description, duration);
        return generatedChapter;
    }

    @Put(':id')
    async updateChapter(
        @Param('id') chapterId: number,
        @Body('title') title: string,
        @Body('description') description: string,
        @Body('duration') duration: number,
        @Body('isActive') isActive: boolean,
        @Body('trainings') trainingsId: number[]
    ) : Promise<Chapter> {
        const updatedChapter = await this.chapterService.updateChapter(
            chapterId, 
            title, 
            description, 
            duration, 
            isActive, 
            trainingsId
        );
        return updatedChapter;
    }

    @Delete(':id')
    deleteChapter(@Param('id') chapterId: number){
        return this.chapterService.deleteChapter(chapterId);
    }
}
