import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { PermissionModule } from './permission/permission.module';


@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [UserModule, RoleModule, PermissionModule],
})
export class AppModule {}
