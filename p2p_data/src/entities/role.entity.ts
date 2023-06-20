import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany } from 'typeorm';
import { User } from "./user.entity";
import { Permission } from "./permission.entity";


@Entity()
export class Role {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    is_active: boolean;
    
    @OneToMany(() => User, (user) => user.id)
    user: User[]

    @ManyToMany(() => Permission, (permission) => permission.id)
    permissions: Permission[]

}