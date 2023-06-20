import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { PermissionModule } from './permission/permission.module';
import { UserTrainingModule } from './user-training/user-training.module';


@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [UserModule, RoleModule, PermissionModule, UserTrainingModule],
})
export class AppModule {}
