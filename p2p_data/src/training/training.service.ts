import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { TrainingRepository } from './training.repository';
import { Training } from 'src/entities/training.entity';
import { TagRepository } from 'src/tag/tag.repository';
import { Tag } from 'src/entities/tag.entity';

@Injectable()
export class TrainingService {
    constructor(
        @Inject(TrainingRepository)
        private readonly trainingRepository: TrainingRepository,

        @Inject(TagRepository)
        private readonly tagRepository: TagRepository,
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

    async searchByName(searchedName: string) : Promise<Training[]> {
        const trainings = await this.trainingRepository.searchByName(searchedName);
        return [ ... trainings ];
    }
    
    async createTraining(title: string): Promise<Training> {
        const training = await this.trainingRepository.createTraining(title);
        return { ... training } ; // Unpack elements and create a new object to avoid sending references.
    }
    
    async updateTraining(trainingId: number, title: string, isActive: boolean, tagId: number): Promise<Training> {
        const previousTraining = await this.getTrainingById(trainingId);
        var tag: Tag;
        if(tagId != undefined) 
            tag = await this.tagRepository.getTagByID(tagId);
        
        return { ... await this.trainingRepository.updateTraining(previousTraining, title, isActive, tag) };
    }
    
    async deleteTraining(trainingId: number): Promise<string> {
        if(await this.trainingRepository.getTrainingByID(trainingId)){
            this.trainingRepository.deleteTraining(trainingId);
            return "Training deleted";
        }
    }
}
