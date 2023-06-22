// import { EntityRepository, Repository } from 'typeorm';
import { Injectable } from "@nestjs/common";
import { Person } from '../entities/person.entity';
import { DataSource } from 'typeorm';


@Injectable()
export class PersonRepository {

    constructor(private dataSource: DataSource) { }
    personRepository = this.dataSource.getRepository(Person);

    async GetAllPersons() : Promise<Person[]> {
        return await this.personRepository.find();
    }

    async GetPersonById(personId : number) : Promise<Person> {
        return await this.personRepository.findOneBy({
            id: personId
        });
    }



    // async findByEmail(email: string): Promise<Person | undefined> {
    //     return this.findOneBy({ email });
    // }


    // async createPerson(name: string, email: string, password: string): Promise<Person> {
    //     const person = this.create({ email, password });
    //     return this.save(person);
    // }

}