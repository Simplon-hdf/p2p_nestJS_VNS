import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany } from 'typeorm';
import { User } from "./user.entity";
import { Permisson } from "./permisson.entity";


@Entity()
export class Role {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
    
    @OneToMany(() => User, (user) => user.id)
    user: User[]

    @ManyToMany(() => Permisson, (permisson) => permisson.id)
    permissons: Permisson[]

}