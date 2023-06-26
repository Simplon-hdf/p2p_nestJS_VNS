import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PersonTraining } from '../entities/personTraining.entity';
import { PersonTrainingRepository } from '../person-training/person-training.repository';


@Injectable()
export class PersonTrainingService {

    constructor(
        @Inject(PersonTrainingRepository)
        private readonly personTrainingRepository: PersonTrainingRepository,
    ) { }

    // Search all
    async GetAllPersonTrainings(): Promise<PersonTraining[]> {
        const personTrainings = await this.personTrainingRepository.GetAllPersonTrainings();
        if (!personTrainings) {
            throw new Error("Error, personTrainings not found !");
        }
        return [...personTrainings];
    }

    // Search one by ID
    async GetPersonTrainingById(personTrainingId: number): Promise<PersonTraining> {
        const personTraining = await this.personTrainingRepository.GetPersonTrainingById(personTrainingId);
        if (!personTraining) {
            throw new Error("Error, personTraining not found !");
        }
        return { ...personTraining };
    }

    // Create one if didn't exist
    async createPersonTraining(
        isAuthor: boolean,
        isActive: boolean,
        personId : number,
        trainingId: number
    ): Promise<PersonTraining> {

        const newPersonTraining = await this.personTrainingRepository.CreatePersonTraining(isAuthor, isActive, personId, trainingId);
        return { ...newPersonTraining }
        
    }

    // Update one 
    async updatePersonTraining(idPersonTraining : number, isAuthor: boolean, isActive: boolean, person: number, training: number ): Promise<PersonTraining> {
        const personTrainingInBdd = await this.personTrainingRepository.GetPersonTrainingById(idPersonTraining);
        if (!personTrainingInBdd) {
            throw new NotFoundException('Update Error : personTraining not found !');
        }
        else {
            const personTrainingUpdated = await this.personTrainingRepository.updatePersonTraining(idPersonTraining, isAuthor, isActive, person, training);
            return personTrainingUpdated;
        }
    }

    // Delete one 
    async deletePersonTraining(personTrainingId: number): Promise<string> {
        const deletedPersonTraining = await this.personTrainingRepository.deletePersonTraining(personTrainingId);
        return deletedPersonTraining
    } 
}
