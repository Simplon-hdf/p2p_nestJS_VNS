import { Controller, Get, Post, Body } from '@nestjs/common';
import { PersonService } from './person.service';
// import { CreatePersonDto } from './dto/create-person.dto';
import { Person } from '../entities/person.entity';

@Controller('person')
export class PersonController {

    constructor(private readonly personService: PersonService) { }

    @Get()
    async findAll(): Promise<Person[]> {
        return this.personService.findAll();
    }

    @Get()
    async findOne(): Promise<Person> {
        return this.personService.findOne();
    }

    // @Get()
    // async findByEmail(): Promise<Person> {
    //     return this.personService.findOne({ email });
    // }


    // @Post()
    // async create(@Body() createPersonDto: CreatePersonDto): Promise<Person> {
    //     return this.personService.create(createPersonDto);
    // }

}
