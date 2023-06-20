import { Entity, PrimaryGeneratedColumn, Column, ManyToOne  } from 'typeorm';
import { Role } from "./role.entity";


@Entity()
export class User {
 
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;
    
    @Column()
    lastName: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    adress: string;

    @Column()
    birthday: Date;

    @Column()
    is_active: boolean;

    @ManyToOne(() => Role, (role) => role.id)
    role: Role

}