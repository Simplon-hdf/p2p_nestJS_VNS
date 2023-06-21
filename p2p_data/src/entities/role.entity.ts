import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { Person } from "./person.entity";
import { Permission } from "./permission.entity";


@Entity()
export class Role {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length : 50 })
    name: string;

    @Column({ default: true })
    isActive: boolean;
    
    @OneToMany(() => Person, (person) => person.role)
    persons: Person[]

    @ManyToMany(() => Permission)
    @JoinTable()
    permissions: Permission[]

}