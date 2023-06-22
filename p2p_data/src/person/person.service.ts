import { Inject, Injectable } from '@nestjs/common';
import { Person } from '../entities/person.entity';
import { PersonRepository } from '../person/person.repository';


@Injectable()
export class PersonService {

    constructor(
        @Inject(PersonRepository)
        private readonly personRepository: PersonRepository,
    ) { }

    async GetAllPersons(): Promise<Person[]> {
        const persons = await this.personRepository.GetAllPersons();
        if (!persons){
            throw new Error("Erreur, personne non trouvée !");
        }
        return [ ...persons ];
    }

    async GetPersonById(personId : number): Promise<Person> {
        const person = await this.personRepository.GetPersonById(personId);
        if (!person){
            throw new Error("Erreur, personne non trouvée !");
        }
        return { ...person };
    }
}
