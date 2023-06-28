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

    // Search all users
    async GetAllPersons(): Promise<Person[]> {
        try {
            return await this.personRepository.find({ relations: { role: true } })
        } catch (error) {
            return error;
        }
    }

    // Search one user by ID
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

    // Search one users by EMAIL
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

    // Create one user if didn't exist
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

    // Update one users
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

    // HARD DELETE
    deletePerson(personId: number) {
        try {
            this.personRepository.delete(personId);
            return "Person is deleted";
        } catch (error) {
            return error;
        }
    }

    // SOFT Delete
    async disabledPerson( personId: number ): Promise<Person> {
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
}