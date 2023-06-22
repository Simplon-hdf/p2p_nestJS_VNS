import { Entity, PrimaryGeneratedColumn, Column, ManyToOne  } from 'typeorm';
import { Person } from "./person.entity";
import { Lesson } from './lesson.entity';

@Entity()
export class PersonLesson {
 
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    isValidate: boolean;

    @ManyToOne(() => Person, (person) => person.id)
    person: Person

    @ManyToOne(() => Lesson, (lesson) => lesson.id)
    lesson: Lesson
}