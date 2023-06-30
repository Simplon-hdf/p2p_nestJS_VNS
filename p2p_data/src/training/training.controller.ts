import { Controller, Get, Put, Post, Delete, Param, Body } from '@nestjs/common';
import { TrainingService } from './training.service';
import { Training } from 'src/entities/training.entity';

@Controller('training')
export class TrainingController {
    constructor(private readonly trainingService: TrainingService) {}

    //#region GET
    /**
     * Get ASll Trainings
     * @returns a LIST off Trainings OBJECTS who comes from Service
     */
    @Get()
    getAllTrainings(){
        return this.trainingService.getAllTrainings();
    }

    /**
     * Get ONE Training by ID
     * @param trainingId (Training's Id who comes from Service)
     * @returns one Training OBJECT who comes from Service
     */
    @Get('id/:id')
    getTrainingById(@Param('id') trainingId : number) {
        return this.trainingService.getTrainingById(trainingId);
    }

    /**
     * Get Chapters by Trainind Id
     * @param trainingId (Training's Id who comes from Service and for find his Chapters)
     * @returns a LIST of Chapters OBJECT who comes from Service
     */
    @Get('chapters/:id')
    getLinkedChapters(@Param('id') trainingId : number) {
        return this.trainingService.getLinkedChapters(trainingId);
    }

    /**
     * Get Trainings by name 
     * @param searchedTitle (the piece of string to find and who comes from the Body request)
     * @returns a LIST of Trainings who comes from Service
     */
    @Get('search')
    searchByName(@Body('title') searchedTitle: string) {
        return this.trainingService.searchByName(searchedTitle);
    }
    //#endregion
    
    /**
     * Post a NEW Training
     * @param title (the title who comes from the request body)
     * @returns the new Training OBJECT who comes from Service
     */
    @Post()
    async createTraining(@Body('title') title: string) : Promise<Training> {
        return this.trainingService.createTraining(title);
    }

    /**
     * Update one Training by Id
     * @param trainingID (the training's Id who comes from the URL)
     * @param title (the title training who comes from the URL)
     * @param isActive (the isActive training who comes from the URL)
     * @param tagId (the tag's Id training who comes from the URL)
     * @param chaptersId (the chapters's Ids who comes from the URL)
     * @returns the updated Training OBJECT who comes from Service
     */
    @Put(':id')
    async updateTraining(
        @Param('id') trainingID: number,
        @Body('title') title: string,
        @Body('isActive') isActive: boolean,
        @Body('tag') tagId: number,
        @Body('chapters') chaptersId: number[]
    ) : Promise<Training> {
        return this.trainingService.updateTraining(trainingID, title, isActive, tagId, chaptersId);
    }

    /**
     * Delete one Training by Id
     * @param trainingID (the training's Id who comes from the URL)
     */
    @Delete(':id')
    deleteTraining(@Param('id') trainingID: number){
        return this.trainingService.deleteTraining(trainingID);
    }
}
