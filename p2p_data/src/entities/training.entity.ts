import {Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn, Double, ManyToOne, ManyToMany, JoinTable} from "typeorm";
import { Tag } from "./tag.entity";
import { Chapter } from "./chapter.entity";
import { UserTraining } from "./userTraining.entity";

@Entity()
export class Training {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({length : 100}) //Same as defining a varchar(100)
    title: string;

    @Column({default : true})
    isActive: boolean;

    @ManyToOne(() => Tag, (tag) => tag.trainings)
    tag: Tag;

    @ManyToMany(() => Chapter)
    @JoinTable()
    chapters: Chapter[];

    @OneToMany(() => UserTraining, (userTraining) => userTraining.training)
    userTrainings: UserTraining[];
}