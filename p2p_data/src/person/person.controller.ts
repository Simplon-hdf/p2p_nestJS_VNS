import { Controller, Get, Post, Body, Param, Req, Put, Delete } from '@nestjs/common';
import { PersonService } from './person.service';
import { Person } from '../entities/person.entity';

@Controller('person')
export class PersonController {

    constructor(private readonly personService: PersonService) { }

    //#region GET

    //Get All Persons
    /**
     * @returns a LIST of Persons who comes from Service (with their relations)
     */
    @Get()
    GetAllPersons() {
        return this.personService.GetAllPersons();
    }

    //Get ONE by ID
    /**
     * @param personId (Person's Id who comes from URL)
     * @returns one Person who comes from Service (with his relations)
     */
    @Get('id/:id')
    GetPersonById(@Param('id') personId: number) {
        return this.personService.GetPersonById(personId);
    }

    //Get ONE by EMAIL
    /**
     * @param req (the request in totality)
     * @returns one Person who comes from Service (with his relations)
     */
    @Get('email')
    GetPersonByEmail(@Req() req) {
        const email = req.body.email;
        return this.personService.GetPersonByEmail(email);
    }
    //#endregion

    /**
     * Post a NEW Person
     * @param req (the request in totality)
     * @returns the Person who was created and who comes from Service
     */
    @Post()
    async createPerson(@Req() req) {
        const lastName = req.body.lastName;
        const firstName = req.body.firstName;
        const email = req.body.email;
        const password = req.body.password;
        const adress = req.body.adress;
        const birthday = req.body.birthday;
        const isActive = req.body.isActive;
        const roleId = req.body.role;

        return this.personService.createPerson(lastName, firstName, email, password, adress, birthday, isActive, roleId);
    }

    //#region Update

    /**
     * Update a Person
     * @param personId (the person's Id who comes from URL)
     * @param req (the request in totality)
     * @returns the Person who was updated in DataBase
     */
    @Put(':id')
    async updatePerson(@Param('id') personId: number, @Req() req): Promise<Person> {

        const lastName = req.body.lastName;
        const firstName = req.body.firstName;
        const email = req.body.email;
        const password = req.body.password;
        const adress = req.body.adress;
        const birthday = req.body.birthday;
        const isActive = req.body.isActive;
        const roleId = req.body.role;

        const updatedPerson = await this.personService.updatePerson(
            personId, lastName, firstName, email, password, adress, birthday, isActive, roleId
        );
        return updatedPerson;
    }

    /**
     * Soft Delete (isActive Update) by Id
     * @param personId (the person's Id who comes from URL)
     * @returns the Person who was disabled from Service
     */
        @Put('disable/:id')
        async disabledPerson(@Param('id') personId: number): Promise<Person> {
            const updatedPerson = await this.personService.disabledPerson(personId);
            return updatedPerson;
        }
    //#endregion

    /**
     * Delete one Person by Id
     * @param personId (the person's Id who comes from URL)
     * @returns a String from Service
     */
    @Delete(':id')
    async deletePerson(@Param('id') personId: number): Promise<string> {
        const deletedPerson = await this.personService.deletePerson(personId);
        return deletedPerson;
    }

}
