import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from "typeorm";

@Entity()
export class Chapter {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length : 100 })
    title:string;
 
    @Column()
    description:string;
}