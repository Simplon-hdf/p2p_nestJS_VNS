import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { TrainingRepository } from './training.repository';
import { Training } from 'src/entities/training.entity';
import { TagRepository } from 'src/tag/tag.repository';
import { Tag } from 'src/entities/tag.entity';
import { ChapterRepository } from 'src/chapter/chapter.repository';

@Injectable()
export class TrainingService {
    constructor(
        @Inject(TrainingRepository)
        private readonly trainingRepository: TrainingRepository,

        @Inject(TagRepository)
        private readonly tagRepository: TagRepository,

        @Inject(ChapterRepository)
        private readonly chapterRepository: ChapterRepository,
      ) {}

    //#region Get methods 
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

    async getTrainingLinkedChapters(trainingId: number) {
        const training = await this.getTrainingById(trainingId);
        return [... await this.trainingRepository.getTrainingLinkedChapters(training)];
    }

    //#endregion

    async searchByName(searchedName: string) : Promise<Training[]> {
        const trainings = await this.trainingRepository.searchByName(searchedName);
        return [ ... trainings ];
    }
    
    async createTraining(title: string): Promise<Training> {
        const training = await this.trainingRepository.createTraining(title);
        return { ... training } ; // Unpack elements and create a new object to avoid sending references.
    }
    
    async updateTraining(trainingId: number, title: string, isActive: boolean, tagId: number, chaptersId: number[]): Promise<Training> {
        const previousTraining = await this.getTrainingById(trainingId);
        
        var tag: Tag;
        if(tagId != undefined) 
            tag = await this.tagRepository.getTagByID(tagId);
        
        var chapters = new Array();
        if(chaptersId.length > 0) {
            for(var chapterId of chaptersId) {
                var chapter = await this.chapterRepository.getChapterByID(chapterId);
                if (chapter) chapters.push(chapter);
            }  
        }
        
        return { ... await this.trainingRepository.updateTraining(previousTraining, title, isActive, tag, chapters) };
    }
    
    async deleteTraining(trainingId: number): Promise<string> {
        if(await this.trainingRepository.getTrainingByID(trainingId)){
            this.trainingRepository.deleteTraining(trainingId);
            return "Training deleted";
        }
    }
}
