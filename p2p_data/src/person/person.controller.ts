import { Controller, Get, Post, Body } from '@nestjs/common';
import { PersonService } from './person.service';
import { Person } from '../entities/person.entity';

@Controller('person')
export class PersonController {

    constructor(private readonly personService: PersonService) { }

    @Get()
    async findAllPerson(): Promise<Person[]> {
        return this.personService.findAll();
    }

    // @Post()
    // async create(@Body() createPersonDto: CreatePersonDto): Promise<Person> {
    //     return this.personService.create(createPersonDto);
    // }








    // @Get()
    // async findOne(): Promise<Person> {
    //     return this.personService.findOne();
    // }

    // @Get()
    // findByEmail() {
    //     return this.personService.findByEmail(email: string);
    // }



}
