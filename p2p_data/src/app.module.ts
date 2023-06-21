import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
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
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],      
            useFactory: (configService: ConfigService) => ({
              type: 'postgres' as 'postgres',
              host: configService.get<string>('DB_HOST'),
              port: parseInt(configService.get<string>('DB_PORT')),
              username: configService.get<string>('DB_USERNAME'),
              password: configService.get<string>('DB_PASSWORD'),
              database: configService.get<string>('DB_NAME'),
              entities: [__dirname + '/**/*.entity{.ts,.js}'],
              synchronize: true,
            }),
            inject: [ConfigService],
          }),
        RoleModule, PermissionModule, TrainingModule, ChapterModule, PersonModule ],
})
export class AppModule { }
