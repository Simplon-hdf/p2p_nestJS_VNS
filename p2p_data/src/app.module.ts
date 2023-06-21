import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RoleModule } from './role/role.module';
import { PermissionModule } from './permission/permission.module';
import { TrainingModule } from './training/training.module';
import { ChapterModule } from './chapter/chapter.module';
import { PersonModule } from './person/person.module';

@Module({
    controllers: [AppController],
    providers: [AppService],
    imports: [
        ConfigModule.forRoot(),
        RoleModule, PermissionModule, TrainingModule, ChapterModule, PersonModule ],
})
export class AppModule { }
