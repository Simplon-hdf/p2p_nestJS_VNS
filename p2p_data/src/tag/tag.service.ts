import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { TagRepository } from './tag.repository';
import { Tag } from 'src/entities/tag.entity';
import { Training } from 'src/entities/training.entity';
import { TrainingRepository } from 'src/training/training.repository';

@Injectable()
export class TagService {
    constructor(
        @Inject(TagRepository)
        private readonly tagRepository: TagRepository,

        @Inject(TrainingRepository)
        private readonly trainingRepository: TrainingRepository,
    ) {}

    async getAllTags(): Promise<Tag[]> {
        const tags = await this.tagRepository.getAllTags();
        return [ ... tags ]; //Unpack tags to not send a reference (to avoid modifying the original array)
        }

    async getTagById(tagId: number): Promise<Tag> {
        const tag = await this.tagRepository.getTagByID(tagId);
        if(!tag){
            throw new NotFoundException('Tag not found');
        }
        return { ... tag };
    }

    async createTag(name: string): Promise<Tag> {
        const tag = await this.tagRepository.createTag(name);
        return { ... tag }; // Unpack elements and create a new object to avoid sending references.
    }

    async updateTag(tagId: number, name: string, isActive: boolean, trainingsId: number[]): Promise<Tag> {
        if(await this.tagRepository.getTagByID(tagId)){

            if(trainingsId.length > 0){
                //Get all trainings by given trainings Id
                var trainings: Training[] = []; //Do not forget to initialize it as empty...
                for(var trainingId of trainingsId) { 
                    var training = await this.trainingRepository.getTrainingByID(trainingId); 
                    if(training) trainings.push(training);
                }
            }
            
            const tag = await this.tagRepository.updateTag(tagId, name, isActive, trainings);
            return { ... tag };
        }
    }

    async deleteTag(tagId: number): Promise<string> {
        if(await this.tagRepository.getTagByID(tagId)){
            this.tagRepository.deleteTag(tagId);
            return "Tag deleted";
        }
    }     
}
