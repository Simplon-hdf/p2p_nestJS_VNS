import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { PermissionModule } from './permission/permission.module';
import { UserTrainingModule } from './user-training/user-training.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrainingModule } from './training/training.module';
import { ChapterModule } from './chapter/chapter.module';

@Module({
    controllers: [AppController],
    providers: [AppService],
    imports: [UserModule, RoleModule, PermissionModule, UserTrainingModule,
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'Nath',
            password: '1234',
            database: 'p2p',
            entities: [__dirname + '/**/*.entity{.ts,.js}'],
            synchronize: true,
            // extra: {
            //     ssl: true
            // }
        }),
        TrainingModule,
        ChapterModule,
    ],
})
export class AppModule { }
