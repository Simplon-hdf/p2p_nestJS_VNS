import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Role } from '../entities/role.entity';
import { RoleRepository } from '../role/role.repository';


@Injectable()
export class RoleService {

    constructor(
        @Inject(RoleRepository)
        private readonly roleRepository: RoleRepository,
    ) { }

    // Search all roles
    async GetAllRoles(): Promise<Role[]> {
        const roles = await this.roleRepository.GetAllRoles();
        if (!roles) {
            throw new Error("Error, roles not found !");
        }
        return [...roles];
    }

    // Search one role by ID
    async GetRoleById(roleId: number): Promise<Role> {
        const role = await this.roleRepository.GetRoleById(roleId);
        if (!role) {
            throw new Error("Error, role not found !");
        }
        return { ...role };
    }

    // Search one role by NAME
    async GetRoleByName(name: string): Promise<Role> {
        const role = await this.roleRepository.GetRoleByName(name);
        if (!role) {
            throw new Error("Error, role not found !");
        }
        return { ...role };
    }

    // Create one role if didn't exist
    async createRole(
        idRole: number,
        name: string,
        isActive: boolean
    ): Promise<Role> {

        const roleInBdd = await this.roleRepository.GetRoleByName(name);
        if (roleInBdd) {
            throw new Error("Error : This role already exist !");
        } else {
            const newRole = await this.roleRepository.CreateRole(name, isActive);
            return { ...newRole }
        }
    }

    // Update one role
    async updateRole(idRole : number, name: string, isActive: boolean ): Promise<Role> {
        const roleInBdd = await this.roleRepository.GetRoleById(idRole);
        if (!roleInBdd) {
            throw new NotFoundException('Update Error : role not found !');
        }
        else {
            const roleUpdated = await this.roleRepository.updateRole(idRole, name, isActive);
            return roleUpdated;
        }
    }

    // Delete one role
    async deleteRole(roleId: number): Promise<string> {
        const deletedRole = await this.roleRepository.deleteRole(roleId);
        return deletedRole
    } 
}
