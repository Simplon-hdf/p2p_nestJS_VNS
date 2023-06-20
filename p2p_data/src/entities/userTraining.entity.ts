import { Entity, PrimaryGeneratedColumn, Column, ManyToOne  } from 'typeorm';
import { Role } from "./role.entity";


@Entity()
export class UserTraining {
 
    @PrimaryGeneratedColumn()
    id: number;


}