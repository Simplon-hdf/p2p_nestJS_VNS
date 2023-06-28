import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Person } from '../entities/person.entity';
import { PersonRepository } from '../person/person.repository';
import { RoleRepository } from '../role/role.repository';


@Injectable()
export class PersonService {

    constructor(
        @Inject(PersonRepository)
        private readonly personRepository: PersonRepository,
        private readonly roleRepository: RoleRepository,
    ) { }

    //#region Get All Persons
    /**
     * @returns a LIST of unpacked Persons who comes from Repository
     */
    async GetAllPersons(): Promise<Person[]> {
        const persons = await this.personRepository.GetAllPersons();
        if (!persons) {
            throw new Error("Error, person not found !");
        }
        return [...persons];
    }
    //#endregion

    //#region  Get ONE by ID
    /**
     * @param personId (Person's Id who comes from Controller)
     * @returns one unpacked Person who comes from Repository
     */
    async GetPersonById(personId: number): Promise<Person> {
        const person = await this.personRepository.GetPersonById(personId);
        if (!person) {
            throw new Error("Error, person not found !");
        }
        return { ...person };
    }
    //#endregion

    //#region Get ONE by EMAIL
    /**
     * @param email (Person's Email who comes from Controller)
     * @returns one unpacked Person who comes from Repository
     */
    async GetPersonByEmail(email: string): Promise<Person> {
        const person = await this.personRepository.GetPersonByEmail(email);
        if (!person) {
            throw new Error("Error, person not found !");
        }
        return { ...person };
    }
    //#endregion

    //#region Post a NEW Person
    /**
     * @param lastName (the lastName who comes from Controller)
     * @param firstName (the firstName who comes from Controller)
     * @param email (the email who comes from Controller)
     * @param password (the password who comes from Controller)
     * @param adress (the adress who comes from Controller)
     * @param birthday (the birthday who comes from Controller)
     * @param isActive (the isActive who comes from Controller)
     * @param roleId (the roleId who comes from Controller)
     * @returns the Person who was created and who comes from Repository
     */
    async createPerson(
        lastName: string,
        firstName: string,
        email: string,
        password: string,
        adress: string,
        birthday: Date,
        isActive: boolean,
        roleId: number
    ): Promise<Person> {

        const personInBdd = await this.personRepository.GetPersonByEmail(email);
        if (personInBdd) {
            throw new Error("Error : This user already exist !");
        } else {
            const newPerson = await this.personRepository.CreatePerson(
                firstName, lastName, email, password, adress, birthday, isActive, roleId
            );
            return { ...newPerson }
        }
    }
    //#endregion

    //#region Update a Person by Id
    /**
     * @param personId (the person's Id who comes from Controller)
     * @param lastName (the lastName who comes from Controller)
     * @param firstName (the firstName who comes from Controller)
     * @param email (the email who comes from Controller)
     * @param password (the password who comes from Controller)
     * @param adress (the adress who comes from Controller)
     * @param birthday (the birthday who comes from Controller)
     * @param isActive (the isActive who comes from Controller)
     * @param roleId (the roleId who comes from Controller)
     * @returns the Person who was updated and who comes from Repository
     */
    async updatePerson(
        personId: number,
        lastName: string,
        firstName: string,
        email: string,
        password: string,
        adress: string,
        birthday: Date,
        isActive: boolean,
        roleId: number
    ): Promise<Person> {

        const personInBdd = await this.personRepository.GetPersonByEmail(email);
        if (!personInBdd) {
            throw new NotFoundException('Person to update not found');
        }
        else {
            const personUpdated = await this.personRepository.updatePerson(
                personId, lastName, firstName, email, password, adress, birthday, isActive, roleId
            );
            return personUpdated;
        }
    }
    //#endregion

    //#region Delete one Person by Id
    /**
     * @param personId  (the person's Id who comes from Controller)
     * @returns the person who was disabled and who comes from Repository
     */
    async deletePerson(personId: number): Promise<string> {
        const deletedPerson = await this.personRepository.deletePerson(personId);
        return deletedPerson
    }
    //#endregion

    //#region  Soft Delete (isActive Update) by Id
    /**
     * @param personId (Person's Id who comes from Controller)
     * @returns the Person who was disabled and who comes from Repository
     */
    async disabledPerson(personId: number): Promise<Person> {
        const personInBdd = await this.personRepository.GetPersonById(personId);
        if (!personInBdd) {
            throw new NotFoundException('Person to update not found');
        }
        else {
            const personUpdated = await this.personRepository.disabledPerson(personId);
            return personUpdated;
        }
    }
    //#endregion

}