import { Entity, PrimaryGeneratedColumn, Column, ManyToOne  } from 'typeorm';
import { Person } from "./person.entity";
import { Training } from "./training.entity";


@Entity()
export class PersonTraining {
 
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: false })
    isAuthor: boolean;

    @Column({ default: true })
    isActive: boolean;

    @ManyToOne(() => Person, (person) => person.personTrainings)
    person: Person

    @ManyToOne(() => Training, (training) => training.personTrainings)
    training: Training
}