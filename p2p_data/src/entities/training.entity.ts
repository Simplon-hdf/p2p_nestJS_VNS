import {Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn} from "typeorm";
//import { Tag } from "./tag.entity";

@Entity()
export class Training {

    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    title : string;

    @Column()
    is_active : string;

    /*@OneToOne(()=> Tag )
    @JoinColumn()
    tag: Tag*/
}