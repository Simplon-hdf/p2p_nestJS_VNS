import { Controller, Get, Post, Param, Req, Put, Delete } from '@nestjs/common';
import { PersonTrainingService } from './person-training.service';
import { PersonTraining } from '../entities/personTraining.entity';


@Controller('person-training')
export class PersonTrainingController {
    constructor(private readonly personTrainingService: PersonTrainingService) { }

    // Search all
    @Get()
    GetAllPersonTrainings() {
        return this.personTrainingService.GetAllPersonTrainings();
    }

    // Search one by ID
    @Get('id/:id')
    GetPersonTrainingById(@Param('id') personTrainingId: number) {
        return this.personTrainingService.GetPersonTrainingById(personTrainingId);
    }

    // Create one if didn't exist
    @Post()
    async createPersonTraining(@Req() req) {
        const isAuthor = req.body.isAuthor;
        const isActive = req.body.isActive;
        return await this.personTrainingService.createPersonTraining(isAuthor, isActive);
    }

    // Update one
    @Put(':id')
    async updatePersonTraining(@Param('id') personTrainingId: number, @Req() req): Promise<PersonTraining> {
        const isAuthor = req.body.isAuthor;
        const isActive = req.body.isActive;
        const updatedPersonTraining = await this.personTrainingService.updatePersonTraining(personTrainingId, isAuthor, isActive);
        return updatedPersonTraining;
    }

    // Delete one
    @Delete(':id')
    async deletePersonTraining(@Param('id') personTrainingId: number): Promise<string> {
        const deletedPersonTraining = await this.personTrainingService.deletePersonTraining(personTrainingId);
        return deletedPersonTraining;
    }
}
