import { Entity, PrimaryGeneratedColumn, Column, ManyToOne  } from 'typeorm';
import { Role } from "./role.entity";


@Entity()
export class User {
 
    @PrimaryGeneratedColumn()
    id_user: number;

    @Column({ length : 50 })
    firstName: string;
    
    @Column({ length : 50 })
    lastName: string;

    @Column({ length : 100, unique: true, nullable: false })
    email: string;

    @Column({ length : 255, nullable: false })
    password: string;

    @Column({ length : 255 })
    adress: string;

    @Column()
    birthday: Date;

    @Column({ default: true })
    is_active: boolean;

    @ManyToOne(() => Role, (role) => role.id_role)
    role: Role

}