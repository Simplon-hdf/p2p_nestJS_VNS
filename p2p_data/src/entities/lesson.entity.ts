import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany } from 'typeorm';
import { Tag } from "./tag.entity";
import { Chapter } from "./chapter.entity";


@Entity()
export class Lesson {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    goal: string;

    @Column()
    subject: string;

    @Column({ default: true })
    isActive: boolean;

    @ManyToOne(() => Tag, (tag) => tag.id)
    tag: Tag;

    @ManyToMany(() => Chapter, (chapter) => chapter.lessons)
    chapters: Chapter[]
}