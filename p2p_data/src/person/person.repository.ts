// import { EntityRepository, Repository } from 'typeorm';
import { Injectable } from "@nestjs/common";
import { Person } from '../entities/person.entity';
import { DataSource } from 'typeorm';


@Injectable()
export class PersonRepository {

    constructor(private dataSource: DataSource) { }
    personRepository = this.dataSource.getRepository(Person);

    async GetAllPersons(): Promise<Person[]> {
        return await this.personRepository.find();
    }

    async GetPersonById(personId: number): Promise<Person> {
        return await this.personRepository.findOneBy({
            id: personId
        });
    }

    async GetPersonByEmail(email: string): Promise<Person> {
        return await this.personRepository.findOneBy({
            email: email
        });
    }

    async CreatePerson(
        lastName: string, 
        firstName: string, 
        email: string,
        password: string, 
        adress: string, 
        birthday: Date, 
        isActive: boolean
    ): Promise<Person> {

        const person = await this.personRepository.create(
            { firstName, lastName, email, password, adress, birthday, isActive }
        );
        return this.personRepository.save(person);
    }

}