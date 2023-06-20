import { Entity, PrimaryGeneratedColumn, Column, ManyToOne  } from 'typeorm';
import { User } from "./user.entity";
import { Lesson } from './lesson.entity';

@Entity()
export class User_lesson {
 
    @PrimaryGeneratedColumn()
    id_user_lesson: number;

    @Column()
    is_validate: boolean;

    @ManyToOne(() => User, (user) => user.id)
    user: User

    @ManyToOne(() => Lesson, (lesson) => lesson.id)
    lesson: Lesson

}