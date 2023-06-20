import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Role } from "./role.entity";


@Entity()
export class Permission {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    is_active: boolean;
    
    @ManyToMany(() => Role, (role) => role.id)
    roles: Role[]

}