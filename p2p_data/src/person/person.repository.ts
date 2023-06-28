// import { EntityRepository, Repository } from 'typeorm';
import { Injectable } from "@nestjs/common";
import { Person } from '../entities/person.entity';
import { Role } from '../entities/role.entity';
import { DataSource } from 'typeorm';


@Injectable()
export class PersonRepository {

    constructor(private dataSource: DataSource) { }
    personRepository = this.dataSource.getRepository(Person);
    roleRepository = this.dataSource.getRepository(Role);

    //#region Get All Persons
    /**
     * @returns a LIST of Persons who comes from DataBase (with their relations)
     */
    async GetAllPersons(): Promise<Person[]> {
        try {
            return await this.personRepository.find({ relations: { role: true } })
        } catch (error) {
            return error;
        }
    }
    //#endregion

    //#region Get ONE by ID
    /**
     * @param personId (Person's Id who comes from Service)
     * @returns one Person who comes from DataBase (with his relations)
     */
    async GetPersonById(personId: number): Promise<Person> {
        try {
            return await this.personRepository.findOne({
                where: { id: personId },
                relations: { role: true }
            });
        } catch (error) {
            return error;
        }
    }
    //#endregion

    //#region Get ONE by EMAIL
    /**
     * @param email (Person's Email who comes from Service)
     * @returns one Person who comes from DataBase (with his relations)
     */
    async GetPersonByEmail(email: string): Promise<Person> {
        try {
            return await this.personRepository.findOne({
                where: { email: email },
                relations: { role: true }
            });
        } catch (error) {
            return error;
        }
    }
    //#endregion

    //#region Post a NEW Person
    /**
     * @param lastName (the lastName who comes from Service)
     * @param firstName (the firstName who comes from Service)
     * @param email (the email who comes from Service)
     * @param password (the password who comes from Service)
     * @param adress (the adress who comes from Service)
     * @param birthday (the birthday who comes from Service)
     * @param isActive (the isActive who comes from Service)
     * @param roleId (the roleId who comes from Service)
     * @returns the Person who was created in DataBase
     */
    async CreatePerson(
        lastName: string,
        firstName: string,
        email: string,
        password: string,
        adress: string,
        birthday: Date,
        isActive: boolean,
        roleId: number
    ): Promise<Person> {
        try {
            const rolePerson = await this.roleRepository.findOne({ where: { id: roleId } });
            const person = await this.personRepository.create(
                { firstName, lastName, email, password, adress, birthday, isActive }
            );
            person.role = rolePerson;
            return this.personRepository.save(person);
        } catch (error) {
            return error;
        }
    }
    //#endregion

    //#region Update a Person by Id
    /**
     * @param personId (the person's Id who comes from Service)
     * @param lastName (the lastName who comes from Service)
     * @param firstName (the firstName who comes from Service)
     * @param email (the email who comes from Service)
     * @param password (the password who comes from Service)
     * @param adress (the adress who comes from Service)
     * @param birthday (the birthday who comes from Service)
     * @param isActive (the isActive who comes from Service)
     * @param roleId (the roleId who comes from Service)
     * @returns the Person who was updated in DataBase
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

        try {
            const person = await this.personRepository.findOneBy({ id: personId });
            const rolePerson = await this.roleRepository.findOne({ where: { id: roleId } });
            person.lastName = lastName;
            person.firstName = firstName;
            person.email = email;
            person.password = password;
            person.adress = adress;
            person.birthday = birthday;
            person.isActive = isActive;
            person.role = rolePerson;
            return this.personRepository.save(person);
        } catch (error) {
            return error;
        }
    }
    //#endregion

    //#region Delete one Person by Id
    /**
     * @param personId (the person's Id who comes from Service)
     * @returns a String
     */
    deletePerson(personId: number) {
        try {
            this.personRepository.delete(personId);
            return "Person is deleted";
        } catch (error) {
            return error;
        }
    }
    //#endregion

    //#region Soft Delete (isActive Update) by Id
    /**
     * @param personId (the person's Id who comes from Service)
     * @returns the Person who was disabled in DataBase
     */
    async disabledPerson(personId: number): Promise<Person> {
        try {
            const person = await this.personRepository.findOneBy({ id: personId });
            person.lastName = "Anonyme";
            person.firstName = "Anonyme";
            person.email = "Anonyme";
            person.password = "0000";
            person.adress = "Anonyme";
            person.birthday = new Date();
            person.isActive = false;
            return this.personRepository.save(person);
        } catch (error) {
            return error;
        }
    }
    //#endregion

}