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

    /**
     * Get All Trainings
     * @returns a LIST off Trainings OBJECTS who comes from Repository
     */
    async getAllTrainings(): Promise<Training[]> {
        const trainings = await this.trainingRepository.getAllTrainings();
        return [ ... trainings ];
    }

    /**
     * Get ONE Training by ID
     * @param trainingId (Training's Id who comes from Controller)
     * @returns one Training OBJECT who comes from Repository
     */
    async getTrainingById(trainingId: number): Promise<Training> {
        try{
            const training = await this.trainingRepository.getTrainingByID(trainingId);
            return { ... training };
        } catch {
            throw new NotFoundException('Training not found');
        }
    }

    /**
     * Get Chapters by Trainind Id
     * @param trainingId (Training's Id who comes from Controller and for find his Chapters)
     * @returns a LIST of Chapters OBJECT who comes from Repository
     */
    async getLinkedChapters(trainingId: number) {
        const training = await this.getTrainingById(trainingId);
        return [... await this.trainingRepository.getLinkedChapters(training)];
    }

    /**
     * Get Trainings by name 
     * @param searchedTitle (the piece of string to find and who comes from Controller)
     * @returns a LIST of Trainings who comes from Repository
     */
    async searchByName(searchedName: string) : Promise<Training[]> {
        const trainings = await this.trainingRepository.searchByName(searchedName);
        return [ ... trainings ];
    }
    //#endregion
    
    /**
     * Post a NEW Training
     * @param title (the title who comes from Controller)
     * @returns the new Training OBJECT who comes from Repository
     */
    async createTraining(title: string): Promise<Training> {
        const training = await this.trainingRepository.createTraining(title);
        return { ... training } ; // Unpack elements and create a new object to avoid sending references.
    }
    
    /**
     * Update one Training by Id
     * @param trainingID (the training's Id who comes from Controller)
     * @param title (the title training who comes from Controller)
     * @param isActive (the isActive training who comes from Controller)
     * @param tagId (the tag's Id training who comes from Controller)
     * @param chaptersId (the chapters's Ids who comes from Controller)
     * @returns the updated Training OBJECT who comes from Repository
     */
    async updateTraining(
        trainingId: number, 
        title: string, 
        isActive: boolean, 
        tagId: number, 
        chaptersId: number[]
    ): Promise<Training> {
        const previousTraining = await this.getTrainingById(trainingId);
        
        var tag: Tag;
        if(tagId != undefined) 
            tag = await this.tagRepository.getTagByID(tagId);
        
        var chapters = new Array();
        if(chaptersId && chaptersId.length > 0) {
            for(var chapterId of chaptersId) {
                var chapter = await this.chapterRepository.getChapterByID(chapterId);
                if (chapter) chapters.push(chapter);
            }  
        }
        
        return { ... await this.trainingRepository.updateTraining(previousTraining, title, isActive, tag, chapters) };
    }
    
    /**
     * Delete one Training by Id
     * @param trainingID (the training's Id who comes from Controller)
     * @returns a STRING if delete is completed
     */
    async deleteTraining(trainingId: number): Promise<string> {
        if(await this.trainingRepository.getTrainingByID(trainingId)){
            this.trainingRepository.deleteTraining(trainingId);
            return "Training deleted";
        }
    }
}
