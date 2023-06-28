import { Module } from '@nestjs/common';
import { PersonTrainingController } from './person-training.controller';
import { PersonTrainingService } from './person-training.service';
import { PersonTrainingRepository } from './person-training.repository';
import { PersonRepository } from '../person/person.repository';
// import { TrainingRepository } from '../training/training.repository';

@Module({
  controllers: [PersonTrainingController],
  providers: [PersonTrainingService, PersonTrainingRepository, PersonRepository]
})
export class PersonTrainingModule {}
