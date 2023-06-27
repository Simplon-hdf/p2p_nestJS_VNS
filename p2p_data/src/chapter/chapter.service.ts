import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ChapterRepository } from './chapter.repository';
import { Chapter } from 'src/entities/chapter.entity';
import { TrainingRepository } from 'src/training/training.repository';
import { Training } from 'src/entities/training.entity';
import { timeStamp } from 'console';

@Injectable()
export class ChapterService {
    constructor(
        @Inject(ChapterRepository)
        private readonly chapterRepository: ChapterRepository,

        @Inject(TrainingRepository)
        private readonly trainingRepository: TrainingRepository,
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

    async getChapterLinkedTrainings(chapterId: number) {
        const chapter = await this.getChapterById(chapterId);
        return [... await this.chapterRepository.getChapterLinkedTrainings(chapter)];
    } 

    async searchByName(searchedName: string) : Promise<Chapter[]> {
        const chapters = await this.chapterRepository.searchByName(searchedName);
        return [ ... chapters ];
    }

    async createChapter(title: string, description: string, duration: number): Promise<Chapter> {
        const chapter = await this.chapterRepository.createChapter(title, description, duration);
        return { ... chapter }; // Unpack elements and create a new object to avoid sending references.
    }

    async updateChapter(
        chapterId: number, 
        title: string, 
        description: string, 
        duration: number, 
        isActive: boolean,
        trainingsId: number[]
    ): Promise<Chapter> {
        const chapterToUpdate = await this.chapterRepository.getChapterByID(chapterId);
      
        var trainings: Training[] = [];
        if(trainingsId.length > 0){
          for(var trainingID of trainingsId){
            var training = await this.trainingRepository.getTrainingByID(trainingID);
            if(training) trainings.push(training);
          }
        }

        const chapter = await this.chapterRepository.updateChapter(
          chapterToUpdate, 
          title, 
          description, 
          duration, 
          isActive, 
          trainings
        );
        return { ... chapter };
      
    }

    async deleteChapter(chapterId: number): Promise<string> {
      if(await this.chapterRepository.getChapterByID(chapterId)){
        this.chapterRepository.deleteChapter(chapterId);
        return "Chapter deleted";
      }
    } 
}
