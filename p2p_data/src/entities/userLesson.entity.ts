import { Entity, PrimaryGeneratedColumn, Column, ManyToOne  } from 'typeorm';
import { User } from "./user.entity";
import { Lesson } from './lesson.entity';

@Entity()
export class UserLesson {
 
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    isValidate: boolean;

    @ManyToOne(() => User, (user) => user.id)
    user: User

    @ManyToOne(() => Lesson, (lesson) => lesson.id)
    lesson: Lesson
}