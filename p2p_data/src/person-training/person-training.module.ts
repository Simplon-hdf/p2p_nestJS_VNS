import { Module } from '@nestjs/common';
import { PersonTrainingController } from './person-training.controller';
import { PersonTrainingService } from './person-training.service';
import { PersonTrainingRepository } from './person-training.repository';

@Module({
  controllers: [PersonTrainingController],
  providers: [PersonTrainingService, PersonTrainingRepository]
})
export class PersonTrainingModule {}