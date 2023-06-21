import {Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn, Double, ManyToOne, ManyToMany, JoinTable} from "typeorm";
import { Tag } from "./tag.entity";
import { Chapter } from "./chapter.entity";
import { User_training } from "./user_training.entity";

@Entity()
export class Training {

    @PrimaryGeneratedColumn()
    id_training : number;

    @Column({length : 100}) //Same as defining a varchar(100)
    title : string;

    @Column({default : true})
    is_active : boolean;

    @ManyToOne(() => Tag, (tag) => tag.trainings)
    tag: Tag;

    @ManyToMany(() => Chapter)
    @JoinTable()
    chapters: Chapter[];

    @OneToMany(() => User_training, (user_training) => user_training.training)
    user_trainings: User_training[];
}