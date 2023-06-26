// import { EntityRepository, Repository } from 'typeorm';
import { Injectable } from "@nestjs/common";
import { PersonTraining } from '../entities/personTraining.entity';
import { DataSource } from 'typeorm';


@Injectable()
export class PersonTrainingRepository {

    constructor(private dataSource: DataSource) { }
    personTrainingRepository = this.dataSource.getRepository(PersonTraining);

    // Search all
    async GetAllPersonTrainings(): Promise<PersonTraining[]> {
        try {
            return await this.personTrainingRepository.find()
        } catch (error) {
            return error;
        }
    }

    // Search one by ID
    async GetPersonTrainingById(personTrainingId: number): Promise<PersonTraining> {
        try {
            return await this.personTrainingRepository.findOneBy({
                id: personTrainingId
            });
        } catch (error) {
            return error;
        }

    }

    // Search one by NAME
    async GetPersonTrainingByName(isAuthor: boolean): Promise<PersonTraining> {
        try {
            return await this.personTrainingRepository.findOneBy({
                isAuthor: isAuthor
            });
        } catch (error) {
            return error;
        }

    }

    // Create one if didn't exist
    async CreatePersonTraining(
        isAuthor: boolean,
        isActive: boolean
    ): Promise<PersonTraining> {
        try {
            const personTraining = await this.personTrainingRepository.create(
                { isAuthor, isActive }
            );
            return this.personTrainingRepository.save(personTraining);
        } catch (error) {
            return error;
        }
    }

    // Update one
    async updatePersonTraining(
        idPersonTraining: number,
        isAuthor: boolean,
        isActive: boolean
    ): Promise<PersonTraining> {

        try {
            const personTraining = await this.personTrainingRepository.findOneBy({ id: idPersonTraining });
            personTraining.isAuthor = isAuthor;
            personTraining.isActive = isActive;
            return this.personTrainingRepository.save(personTraining);
        } catch (error) {
            return error;
        }
    }

    // Delete one
    deletePersonTraining(personTrainingId: number) {
        try {
            this.personTrainingRepository.delete(personTrainingId);
            return "PersonTraining is deleted";
        } catch (error) {
            return error;
        }
    }
}