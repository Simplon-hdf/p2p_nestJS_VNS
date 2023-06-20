import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { PermissonModule } from './permisson/permisson.module';


@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [UserModule, RoleModule, PermissonModule],
})
export class AppModule {}
