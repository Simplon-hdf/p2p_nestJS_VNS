import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Role } from "./role.entity";
import { PersonTraining } from "./personTraining.entity";
import { PersonLesson } from "./personLesson.entity";
import { Chapter } from "./chapter.entity";


@Entity()
export class Person {
 
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
    // @Column('date')
    // birthday: string;

    @Column({ default: true })
    isActive: boolean;

    @ManyToOne(() => Role, (role) => role.persons)
    role: Role

    @OneToMany(() => PersonTraining, (personTraining) => personTraining.person)
    personTrainings: PersonTraining[]

    @OneToMany(() => Chapter, (chapter) => chapter.creator)
    chapters: Chapter[]

    @OneToMany(() => PersonLesson, (personLesson) => personLesson.person)
    personLessons: PersonLesson[]

}