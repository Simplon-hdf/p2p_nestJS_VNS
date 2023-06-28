import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ChapterRepository } from './chapter.repository';
import { Chapter } from 'src/entities/chapter.entity';
import { TrainingRepository } from 'src/training/training.repository';
import { Training } from 'src/entities/training.entity';

@Injectable()
export class ChapterService {
    constructor(
        @Inject(ChapterRepository)
        private readonly chapterRepository: ChapterRepository,

        @Inject(TrainingRepository)
        private readonly trainingRepository: TrainingRepository,
    ) {}
    
    //#region GET

    /**
     * Get All Chapters
     * @returns a LIST of unpacked Chapters who comes from Repository
     */
    async getAllChapters(): Promise<Chapter[]> {
        const chapters = await this.chapterRepository.getAllChapters();
        return [ ... chapters ]; //Unpack chapters to not send a reference (to avoid modifying the original array)
    }
 
    /**
     * Get ONE Chapter by ID
     * @param chapterId (Chapter's Id who comes from Controller)
     * @returns one unpacked Chapter who comes from Repository
     */
    async getChapterById(chapterId: number): Promise<Chapter> {
        const chapter = await this.chapterRepository.getChapterByID(chapterId);
        if(!chapter){
            throw new NotFoundException('Chapter not found');
        }
        return { ... chapter };
    }

    /**
     * Get Trainings for one Chapter
     * @param chapterId (Chapter's Id who comes from controller)
     * @returns a LIST of Trainings who comes from Repository
     */
    async getLinkedTrainings(chapterId: number) {
        const chapter = await this.getChapterById(chapterId);
        return [... await this.chapterRepository.getLinkedTrainings(chapter)];
    } 

    /**
     * Get Chapter by name
     * @param searchedName (the piece of string who comes from Controller)
     * @returns a LIST of unpacked Chapters who comes from Repository
     */
    async searchByName(searchedName: string) : Promise<Chapter[]> {
      const chapters = await this.chapterRepository.searchByName(searchedName);
      return [ ... chapters ];
    }
    //#endregion
 
    /**
     * Post a NEW Chapter
     * @param title (the title who comes from Controller)
     * @param description (the description who comes from Controller)
     * @param duration (the duration who comes from Controller)
     * @param lessonsIds (a list of lessons Ids who comes from Controller)
     * @returns the unpacked Chapter who was created and who comes from Repository
     */
    async createChapter(
        title: string, 
        description: string, 
        duration: number, 
        lessonsIds: number[]
        ): Promise<Chapter> {
        
            const chapter = await this.chapterRepository.createChapter(title, description, duration, lessonsIds);
        return { ... chapter }; // Unpack elements and create a new object to avoid sending references.
    }

    /**
     * Update a chapter by Id
     * @param chapterId (the Id chapter who comes from the Controller)
     * @param title (the title who comes from the Controller)
     * @param description (the description who comes from the Controller)
     * @param duration (the duration who comes from the Controller)
     * @param isActive (the isActive who comes from the Controller)
     * @param trainingsId (the Ids Trainings LIST who comes from the Controller)
     * @param lessonsIds (the Ids Lessons LIST who comes from the Controller)
     * @returns the unpacked Chapter who was created and who comes from Repository 
     */
    async updateChapter(
        chapterId: number, 
        title: string, 
        description: string, 
        duration: number, 
        isActive: boolean,
        trainingsId: number[],
        lessonsIds: number[]
    ): Promise<Chapter> {

        const chapterToUpdate = await this.chapterRepository.getChapterByID(chapterId);
        let trainings: Training[] = [];
        if(trainingsId && trainingsId.length > 0){
            for(let trainingID of trainingsId){
              let training = await this.trainingRepository.getTrainingByID(trainingID);
              if(training) trainings.push(training);
            }
        }

        const chapter = await this.chapterRepository.updateChapter(
            chapterToUpdate, 
            title, 
            description, 
            duration, 
            isActive, 
            trainings,
            lessonsIds
        );
        return { ... chapter };
    }

    /**
     * Delete one Chapter By Id
     * @param chapterId (the chapter's Id who comes from the Controller)
     * @returns a STRING who comes from Repository
     */
    async deleteChapter(chapterId: number): Promise<string> {
      if(await this.chapterRepository.getChapterByID(chapterId)){
        this.chapterRepository.deleteChapter(chapterId);
        return "Chapter deleted";
      }
    }

}
