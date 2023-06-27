import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ChapterRepository } from './chapter.repository';
import { Chapter } from 'src/entities/chapter.entity';

@Injectable()
export class ChapterService {git 
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
        throw new NotFoundException('Chapter not found');
    }
    return { ... chapter };
  }

  async searchByName(searchedName: string) : Promise<Chapter[]> {
    const chapters = await this.chapterRepository.searchByName(searchedName);
    return [ ... chapters ];
  }

  async createChapter(title: string, description: string, duration: number, lessonsIds: number[]): Promise<Chapter> {
      const chapter = await this.chapterRepository.createChapter(title, description, duration, lessonsIds);
      return { ... chapter }; // Unpack elements and create a new object to avoid sending references.
  }

  async updateChapter(chapterId: number, title: string, description: string, duration: number, isActive: boolean, lessonsIds: number[]): Promise<Chapter> {
    if(await this.chapterRepository.getChapterByID(chapterId)){
      const chapter = await this.chapterRepository.updateChapter(chapterId, title, description, duration, isActive, lessonsIds);
      return { ... chapter };
    }
  }

  async deleteChapter(chapterId: number): Promise<string> {
    if(await this.chapterRepository.getChapterByID(chapterId)){
      this.chapterRepository.deleteChapter(chapterId);
      return "Chapter deleted";
    }
  } 
}
