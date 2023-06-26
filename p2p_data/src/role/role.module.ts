import { Module } from '@nestjs/common';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { RoleRepository } from './role.repository';
import { PersonRepository } from '../person/person.repository';
// import { PermissionRepository } from '../permission/permission.repository';

@Module({
  controllers: [RoleController],
  providers: [RoleService, RoleRepository, PersonRepository]
  // providers: [RoleService, RoleRepository, PemissionRepository]
})
export class RoleModule {}
