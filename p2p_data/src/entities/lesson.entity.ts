import { Entity, PrimaryGeneratedColumn, Column, ManyToOne  } from 'typeorm';
import { Tag } from "./tag.entity";


@Entity()
export class Lesson {
 
    @PrimaryGeneratedColumn()
    id_lesson: number;

    @Column()
    title: string;
    
    @Column()
    goal: string;

    @Column()
    subject: string;

    
    @Column()
    is_active: boolean;

    @ManyToOne(() => Tag, (tag) => tag.id_tag)
    tag: Tag

}