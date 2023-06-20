import { Module } from '@nestjs/common';
import { UserTrainingController } from './user-training.controller';
import { UserTrainingService } from './user-training.service';

@Module({
  controllers: [UserTrainingController],
  providers: [UserTrainingService]
})
export class UserTrainingModule {}
