import { Module } from '@nestjs/common';
import { PersonController } from './person.controller';
import { PersonService } from './person.service';
import { PersonRepository } from '../person/person.repository';

@Module({
  controllers: [PersonController],
  providers: [PersonService, PersonRepository]
})
export class PersonModule {}
