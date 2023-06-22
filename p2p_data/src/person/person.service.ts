import { Injectable } from '@nestjs/common';
import { Person } from '../entities/person.entity';
import { PersonRepository } from '../person/person.repository';


@Injectable()
export class PersonService {

    constructor(private readonly personRepository: PersonRepository) {}

    async findAllPerson(): Promise<Person[]> {
        const personFind = await this.personRepository.findAll();
        
        if (!personFind){
            throw new Error("Erreur, personne non trouvée !");
        }
        return [... personFind];
    }


    // async findByEmail(email: string): Promise<Person | undefined> {
    //     const personFind = this.personRepository.findByEmail(email);
    //     if (!personFind){
    //         throw new Error("");
    //     }
    //     return { ... personFind }
    // }


    







    // findAll(): Person[] {
    //     return this.persons;
    // }

}
