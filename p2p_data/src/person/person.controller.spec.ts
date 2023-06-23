import { Controller, Get, Post, Body, Param, Req } from '@nestjs/common';
import { PersonService } from './person.service';
import { Person } from '../entities/person.entity';

@Controller('person')
export class PersonController {

    constructor(private readonly personService: PersonService) { }

    @Get()
    GetAllPersons() {
        return this.personService.GetAllPersons();
    }

    @Get('id/:id')
    GetPersonById(@Param('id') personId : number) {
        return this.personService.GetPersonById(personId);
    }

    @Get('email')
    GetPersonByEmail(@Req() req) {
        const email = req.body.email;
        return this.personService.GetPersonByEmail(email);
    }

    @Post()
    async createPerson(@Req() req) {
        const lastName = req.body.lastName;
        const firstName = req.body.firstName;
        const email = req.body.email;
        const password = req.body.password;
        const adresse = req.body.adresse;
        const birthday = req.body.birthday;
        const isActive = req.body.isActive;
        return this.personService.createPerson(lastName,firstName,email,password,adresse,birthday,isActive);
    }





}
