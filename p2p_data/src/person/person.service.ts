import { Injectable } from '@nestjs/common';
import { Person } from '../entities/person.entity';


@Injectable()
export class PersonService {

    private persons: Person[] = [];
    private person: Person;


    findOne(): Person {
        return this.person;
    }

    findByEmail(email: string): Person {
        return this.person;
    }

    findAll(): Person[] {
        return this.persons;
    }

    create(): Person[] {
        return this.persons;
    }
}
