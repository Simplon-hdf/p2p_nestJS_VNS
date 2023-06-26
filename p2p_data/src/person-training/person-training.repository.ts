// import { EntityRepository, Repository } from 'typeorm';
import { Injectable } from "@nestjs/common";
import { DataSource } from 'typeorm';
import { PersonTraining } from '../entities/personTraining.entity';
import { Person } from '../entities/person.entity';
import { Training } from '../entities/training.entity';


@Injectable()
export class PersonTrainingRepository {

    constructor(private dataSource: DataSource) { }
    personTrainingRepository = this.dataSource.getRepository(PersonTraining);
    personRepository = this.dataSource.getRepository(Person);
    trainingRepository = this.dataSource.getRepository(Training);


    // Search all
    async GetAllPersonTrainings(): Promise<PersonTraining[]> {
        try {
            return await this.personTrainingRepository.find({ relations: { person: true, training: true } })
        } catch (error) {
            return error;
        }
    }

    // Search one by ID
    async GetPersonTrainingById(personTrainingId: number): Promise<PersonTraining> {
        try {
            return await this.personTrainingRepository.findOne({
                where: { id: personTrainingId },
                relations: { person: true, training: true } 
            });
        } catch (error) {
            return error;
        }

    }

    // Create one if didn't exist
    async CreatePersonTraining(
        isAuthor: boolean,
        isActive: boolean,
        personId : number,
        trainingId: number
    ): Promise<PersonTraining> {
        try {
            const person = await this.personRepository.findOne({ where: { id: personId } });
            const training = await this.trainingRepository.findOne({ where: { id: trainingId } });
            const personTraining = await this.personTrainingRepository.create(
                { isAuthor, isActive }
            );
            personTraining.training = training;
            personTraining.person = person;
            return this.personTrainingRepository.save(personTraining);
        } catch (error) {
            return error;
        }
    }

    // Update one
    async updatePersonTraining(
        idPersonTraining: number,
        isAuthor: boolean,
        isActive: boolean,
        personId : number,
        trainingId: number
    ): Promise<PersonTraining> {

        try {
            const personTraining = await this.personTrainingRepository.findOneBy({ id: idPersonTraining });
            const person = await this.personRepository.findOne({ where: { id: personId } });
            const training = await this.trainingRepository.findOne({ where: { id: trainingId } });

            personTraining.isAuthor = isAuthor;
            personTraining.isActive = isActive;
            personTraining.person = person;
            personTraining.training = training;
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