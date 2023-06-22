// import { EntityRepository, Repository } from 'typeorm';
import { Repository } from 'typeorm';
import { Person } from '../entities/person.entity';
import { DataSource } from 'typeorm';

// @EntityRepository(Person)
export class PersonRepository extends Repository<Person> {
    // constructor (private dataSource: DataSource){}

    async findAllPerson(): Promise<Person[]> {
        return this.find();
    }



    // async findByEmail(email: string): Promise<Person | undefined> {
    //     return this.findOneBy({ email });
    // }


    // async createPerson(name: string, email: string, password: string): Promise<Person> {
    //     const person = this.create({ email, password });
    //     return this.save(person);
    // }

}