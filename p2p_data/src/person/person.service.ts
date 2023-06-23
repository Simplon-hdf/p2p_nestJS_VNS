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
        if (!persons) {
            throw new Error("Erreur, personne non trouvée !");
        }
        return [...persons];
    }



    async GetPersonById(personId : number): Promise<Person> {
        const person = await this.personRepository.GetPersonById(personId);
        if (!person) {
            throw new Error("Erreur, personne non trouvée !");
        }
        return { ...person };
    }



    async GetPersonByEmail(email : string): Promise<Person> {
        const person = await this.personRepository.GetPersonByEmail(email);
        if (!person) {
            throw new Error("Erreur, personne non trouvée !");
        }
        return { ...person };
    }



    async createPerson(
        lastName: string, 
        firstName: string, 
        email: string, 
        password: string, 
        adress: string, 
        birthday: string, 
        isActive: boolean
        ): Promise<Person> {

        const personInBdd = await this.personRepository.GetPersonByEmail(email);

        if (personInBdd) {
            throw new Error("Erreur : cet utilisateur existe déjà !");

        } else {
            const newPerson = await this.personRepository.CreatePerson(
                firstName, lastName, email, password, adress, birthday, isActive
            );
           return { ... newPerson }
        }
    }






}
