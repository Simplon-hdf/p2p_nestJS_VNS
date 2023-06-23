// import { EntityRepository, Repository } from 'typeorm';
import { Injectable } from "@nestjs/common";
import { Role } from '../entities/role.entity';
import { DataSource } from 'typeorm';


@Injectable()
export class RoleRepository {

    constructor(private dataSource: DataSource) { }
    roleRepository = this.dataSource.getRepository(Role);

    // Search all 
    async GetAllRoles(): Promise<Role[]> {
        try {
            return await this.roleRepository.find({ relations: { persons: true } })
        } catch (error) {
            return error;
        }
    }

    // Search one by ID
    async GetRoleById(roleId: number): Promise<Role> {
        try {
            return await this.roleRepository.findOne({
                where: { id: roleId },
                relations: { persons: true }
            });
        } catch (error) {
            return error;
        }

    }

    // Search one by NAME
    async GetRoleByName(name: string): Promise<Role> {
        try {
            return await this.roleRepository.findOne({
                where: { name: name },
                relations: { persons: true }
            });
        } catch (error) {
            return error;
        }

    }

    // Create one if didn't exist
    async CreateRole(name: string, isActive: boolean): Promise<Role> {
        try {
            const role = await this.roleRepository.create({ name, isActive });
            return this.roleRepository.save(role);
        } catch (error) {
            return error;
        }
    }

    // Update one
    async updateRole(idRole: number, name: string, isActive: boolean): Promise<Role> {
        try {
            const role = await this.roleRepository.findOneBy({ id: idRole });
            role.name = name;
            role.isActive = isActive;
            return this.roleRepository.save(role);
        } catch (error) {
            return error;
        }
    }

    // Delete one
    deleteRole(roleId: number) {
        try {
            this.roleRepository.delete(roleId);
            return "Role is deleted";
        } catch (error) {
            return error;
        }
    }
}