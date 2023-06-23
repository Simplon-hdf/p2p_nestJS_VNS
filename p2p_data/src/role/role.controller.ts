import { Controller, Get, Post, Body, Param, Req, Put, Delete } from '@nestjs/common';
import { RoleService } from './role.service';
import { Role } from '../entities/role.entity';


@Controller('role')
export class RoleController {
    constructor(private readonly roleService: RoleService) { }

    // Search all Roles
    @Get()
    GetAllRoles() {
        return this.roleService.GetAllRoles();
    }

    // Search one Roles by ID
    @Get('id/:id')
    GetRoleById(@Param('id') roleId: number) {
        return this.roleService.GetRoleById(roleId);
    }

    // Create one Roles if didn't exist
    @Post()
    async createRole(@Param('id') idRole: number, @Req() req) {
        const name = req.body.name;
        const isActive = req.body.isActive;
        return await this.roleService.createRole(idRole, name, isActive);
    }

    // Update one Roles
    @Put(':id')
    async updateRole(@Param('id') roleId: number, @Req() req): Promise<Role> {
        const name = req.body.name;
        const isActive = req.body.isActive;
        const updatedRole = await this.roleService.updateRole(roleId, name, isActive);
        return updatedRole;
    }

    // Delete one Roles
    @Delete(':id')
    async deleteRole(@Param('id') roleId: number): Promise<string> {
        const deletedRole = await this.roleService.deleteRole(roleId);
        return deletedRole;
    }
}
