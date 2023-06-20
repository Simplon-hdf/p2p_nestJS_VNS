import {Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn, Double} from "typeorm";
//import { Tag } from "./tag.entity";

@Entity()
export class Training {

    @PrimaryGeneratedColumn()
    id : number;

    @Column({length : 100}) //Same as defining a varchar(100)
    title : string;

    @Column({default : true})
    is_active : boolean;

    /*@OneToMany(()=> Tag, (tag) => tag.training )
    @JoinColumn()
    tag: Tag[];*/

}