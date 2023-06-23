import { Controller, Get, Put, Post, Delete, Param } from '@nestjs/common';
import { TrainingService } from './training.service';
import { Training } from 'src/entities/training.entity';

@Controller('training')
export class TrainingController {
    constructor(private readonly trainingService: TrainingService) {}

    @Get()
    getAllTrainings(){
        return this.trainingService.getAllChapters();
    }

    @Get(':id')
    getTrainingById(@Param('id') trainingId : number) {
        return this.trainingService.getChapterById(trainingId);
    }

    // @Post()
    // async createTraining(
    //     @Body('title') title: string,
    //     @Body('description') description: string,
    //     @Body('duration') duration: number
    // ) : Promise<Training> {

    // }

    // @Put(':id')
    // async updateTraining(
    //     @Param('id') trainingID: number
    // ) : Promise<Training> {

    // }

    // @Delete(':id')
    // deleteTraining(@Param('id') trainingID: number){

    // }
}
