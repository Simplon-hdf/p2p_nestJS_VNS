import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany  } from 'typeorm';
import { Role } from "./role.entity";
import { User_training } from "./user_training.entity";
import { User_lesson } from "./user_lesson.entity";
import { Chapter } from "./chapter.entity";


@Entity()
export class User {
 
    @PrimaryGeneratedColumn()
    id_user: number;

    @Column({ length : 50 })
    firstName: string;
    
    @Column({ length : 50 })
    lastName: string;

    @Column({ length : 100, unique: true, nullable: false })
    email: string;

    @Column({ length : 255, nullable: false })
    password: string;

    @Column({ length : 255 })
    adress: string;

    @Column()
    birthday: Date;

    @Column({ default: true })
    is_active: boolean;

    @ManyToOne(() => Role, (role) => role.users)
    role: Role

    @OneToMany(() => User_training, (user_training) => user_training.user)
    user_trainings: User_training[]

    @OneToMany(() => Chapter, (chapter) => chapter.creator)
    chapters: Chapter[]

    @OneToMany(() => User_lesson, (user_lesson) => user_lesson.user)
    user_lessons: User_lesson[]

}