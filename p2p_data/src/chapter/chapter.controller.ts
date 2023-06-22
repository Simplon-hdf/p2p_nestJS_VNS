import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ChapterService } from './chapter.service';
import { Chapter } from 'src/entities/chapter.entity';

@Controller('chapter')
export class ChapterController {
    constructor(private readonly chapterService: ChapterService) {}

    @Get()
    getAllChapters(){
        return this.chapterService.getAllChapters();
    }

    @Get(':id')
    getChapterById(@Param('id') chapterId : number) {
        return this.chapterService.getChapterById(chapterId);
    }

    @Post()
    async createChapter(
        @Body('title') title: string,
        @Body('description') description: string,
        @Body('duration') duration: number
    ) : Promise<Chapter> {
        const generatedChapter = this.chapterService.createChapter(title, description, duration);
        return generatedChapter;
    }
}
