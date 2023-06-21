import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable } from 'typeorm';
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
    
    @OneToMany(() => User, (user) => user.role)
    users: User[]

    @ManyToMany(() => Permission)
    @JoinTable()
    permissions: Permission[]

}