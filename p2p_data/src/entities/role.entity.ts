import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany } from 'typeorm';
import { User } from "./user.entity";
import { Permission } from "./permission.entity";


@Entity()
export class Role {

    @PrimaryGeneratedColumn()
    id_role: number;

    @Column({ length : 50 })
    name: string;

    @Column({ default: true })
    is_active: boolean;
    
    @OneToMany(() => User, (user) => user.id_user)
    user: User[]

    @ManyToMany(() => Permission, (permission) => permission.id_permission)
    permissions: Permission[]

}