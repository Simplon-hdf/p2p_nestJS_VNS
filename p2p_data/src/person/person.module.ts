import { Module } from '@nestjs/common';
import { PersonController } from './person.controller';
import { PersonService } from './person.service';
import { PersonRepository } from '../person/person.repository';
import { RoleRepository } from '../role/role.repository';

@Module({
  controllers: [PersonController],
  providers: [PersonService, PersonRepository, RoleRepository]
})
export class PersonModule {}
