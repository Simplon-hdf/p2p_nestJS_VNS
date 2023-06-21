import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn, ManyToMany, JoinTable, ManyToOne } from "typeorm";
import { Tag } from "./tag.entity";
import { Lesson } from "./lesson.entity";
import { User } from "./user.entity";

@Entity()
export class Chapter {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length : 100 })
    title: string;
 
    @Column()
    description: string;

    @Column()
    duration: number;

    @Column({default : true})
    isActive : boolean;

    @ManyToMany(() => Tag)
    @JoinTable()
    tags: Tag[];

    @ManyToMany(() => Lesson)
    @JoinTable()
    lessons: Lesson[];

    //One chapter has one creator. One creator can create many chapters.
    @ManyToOne(() => User, (creator) => creator.chapters)
    creator: User
}