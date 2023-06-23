import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { TrainingRepository } from './training.repository';
import { Training } from 'src/entities/training.entity';

@Injectable()
export class TrainingService {
    constructor(
        @Inject(TrainingRepository)
        private readonly trainingRepository: TrainingRepository,
      ) {}

    //   async getAllChapters(): Promise<Training[]> {

    //   }
    
    //   async getChapterById(trainingId: number): Promise<Training> {

    //   }
    
    //   async createChapter(title: string, description: string, duration: number): Promise<Training> {

    //   }
    
    //   async updateChapter(trainingId: number, title: string, description: string, duration: number, isActive: boolean): Promise<Training> {

    //   }
    
    //   async deleteChapter(trainingId: number): Promise<string> {

    //   }
}
