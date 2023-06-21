import { Entity, PrimaryGeneratedColumn, Column, ManyToOne  } from 'typeorm';
import { Tag } from "./tag.entity";


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

    @Column()
    isActive: boolean;

    @ManyToOne(() => Tag, (tag) => tag.id)
    tag: Tag

}