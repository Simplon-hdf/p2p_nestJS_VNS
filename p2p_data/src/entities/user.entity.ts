import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany  } from 'typeorm';
import { Role } from "./role.entity";
import { UserTraining } from "./userTraining.entity";
import { UserLesson } from "./userLesson.entity";
import { Chapter } from "./chapter.entity";


@Entity()
export class User {
 
    @PrimaryGeneratedColumn()
    id: number;

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
    isActive: boolean;

    @ManyToOne(() => Role, (role) => role.users)
    role: Role

    @OneToMany(() => UserTraining, (userTraining) => userTraining.user)
    userTrainings: UserTraining[]

    @OneToMany(() => Chapter, (chapter) => chapter.creator)
    chapters: Chapter[]

    @OneToMany(() => UserLesson, (userLesson) => userLesson.user)
    userLessons: UserLesson[]

}