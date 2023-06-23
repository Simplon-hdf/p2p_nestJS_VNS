import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { TrainingRepository } from './training.repository';
import { Training } from 'src/entities/training.entity';

@Injectable()
export class TrainingService {
    constructor(
        @Inject(TrainingRepository)
        private readonly trainingRepository: TrainingRepository,
      ) {}

    async getAllChapters(): Promise<Training[]> {
        const trainings = await this.trainingRepository.getAllTrainings();
        return [ ... trainings ];
    }

    async getChapterById(trainingId: number): Promise<Training> {
        const training = await this.trainingRepository.getTrainingByID(trainingId);
        if(!training){
            throw new NotFoundException('Training not found');
        }
        return { ... training };
    }
    
    //   async createChapter(title: string, description: string, duration: number): Promise<Training> {

    //   }
    
    //   async updateChapter(trainingId: number, title: string, description: string, duration: number, isActive: boolean): Promise<Training> {

    //   }
    
    //   async deleteChapter(trainingId: number): Promise<string> {

    //   }
}
