import { Inject, Injectable } from '@nestjs/common';
import { ChapterRepository } from './chapter.repository';
import { Chapter } from 'src/entities/chapter.entity';

@Injectable()
export class ChapterService {
    constructor(
        @Inject(ChapterRepository)
        private readonly chapterRepository: ChapterRepository,
      ) {}

      async getAllChapters(): Promise<Chapter[]> {
        const chapters = await this.chapterRepository.getAllChapters();
        return [ ... chapters ]; //Unpack chapters to not send a reference (to avoid modifying the original array)
      }

      async getChapterById(chapterId: number): Promise<Chapter> {
        const chapter = await this.chapterRepository.getChapterByID(chapterId);
        if(!chapter){
            throw new Error('Chapter not found');
        }
        return { ... chapter };
      }

    async createChapter(title: string, description: string, duration: number): Promise<Chapter> {
        const chapter = await this.chapterRepository.createChapter(title, description, duration);
        return { ... chapter }; // Unpack elements and create a new object to avoid sending references.
    }

    async updateChapter(chapterId: number, title: string, description: string, duration: number, isActive: boolean): Promise<Chapter> {
        const chapter = await this.chapterRepository.updateChapter(chapterId, title, description, duration, isActive);
        return { ... chapter };
    }

    async deleteChapter(chapterId: number): Promise<string> {
        this.chapterRepository.deleteChapter(chapterId);
        return "Chapter deleted";
    } 
}
