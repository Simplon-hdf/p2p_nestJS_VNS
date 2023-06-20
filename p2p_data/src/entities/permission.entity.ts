import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Role } from "./role.entity";


@Entity()
export class Permission {

    @PrimaryGeneratedColumn()
    id_permission: number;

    @Column({ length: 50, nullable: true })
    name: string;

    @Column({ length: 255, nullable: true })
    description: string;

    @Column({default: true, nullable: false})
    is_active: boolean;
    
    @ManyToMany(() => Role, (role) => role.id_role)
    roles: Role[]

}