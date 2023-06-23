import { Controller } from '@nestjs/common';
import { TrainingService } from './training.service';
import { Training } from 'src/entities/training.entity';

@Controller('training')
export class TrainingController {
    
    // @Get()
    // getAllChapters(){
        
    // }

    // @Get(':id')
    // getChapterById(@Param('id') chapterId : number) {
        
    // }

    // @Post()
    // async createChapter(
    //     @Body('title') title: string,
    //     @Body('description') description: string,
    //     @Body('duration') duration: number
    // ) : Promise<Training> {

    // }

    // @Put(':id')
    // async updateChapter(
    //     @Param('id') trainingID: number
    // ) : Promise<Training> {

    // }

    // @Delete(':id')
    // deleteChapter(@Param('id') trainingID: number){

    // }
}
