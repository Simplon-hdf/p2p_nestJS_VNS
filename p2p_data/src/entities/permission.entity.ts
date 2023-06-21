import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Role } from "./role.entity";


@Entity()
export class Permission {

    @PrimaryGeneratedColumn()
    id_permission: number;

    @Column({ length: 50 })
    name: string;

    @Column({ length: 255 })
    description: Text;

    @Column({default: true })
    is_active: boolean;
    
    @ManyToMany(() => Role, (role) => role.id_role)
    roles: Role[]

}