import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { PermissionModule } from './permission/permission.module';
import { UserTrainingModule } from './user-training/user-training.module';
import { TrainingModule } from './training/training.module';
import { ChapterModule } from './chapter/chapter.module';


@Module({
    controllers: [AppController],
    providers: [AppService],
    imports: [UserModule, RoleModule, PermissionModule, UserTrainingModule, TrainingModule, ChapterModule ],
})
export class AppModule { }
