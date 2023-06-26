import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { TrainingRepository } from './training.repository';
import { Training } from 'src/entities/training.entity';

@Injectable()
export class TrainingService {
    constructor(
        @Inject(TrainingRepository)
        private readonly trainingRepository: TrainingRepository,
      ) {}

    async getAllTrainings(): Promise<Training[]> {
        const trainings = await this.trainingRepository.getAllTrainings();
        return [ ... trainings ];
    }

    async getTrainingById(trainingId: number): Promise<Training> {
        try{
            const training = await this.trainingRepository.getTrainingByID(trainingId);
            return { ... training };
        } catch {
            throw new NotFoundException('Training not found');
        }
    }
    
    async createTraining(title: string): Promise<Training> {
        const training = await this.trainingRepository.createTraining(title);
        return { ... training }; // Unpack elements and create a new object to avoid sending references.
    }
    
    async updateTraining(trainingId: number, title: string, isActive: boolean): Promise<Training> {
        const previousTraining = await this.getTrainingById(trainingId);
        const training = await this.trainingRepository.updateTraining(previousTraining, title, isActive);
        return { ... training };
    }
    
    async deleteTraining(trainingId: number): Promise<string> {
        if(await this.trainingRepository.getTrainingByID(trainingId)){
            this.trainingRepository.deleteTraining(trainingId);
            return "Training deleted";
        }
    }
}
