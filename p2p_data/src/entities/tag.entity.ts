import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany  } from 'typeorm';
import { Training } from './training.entity';


@Entity()
export class Tag {
 
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
    
    @OneToMany(() => Training, (training => training.tag))
    trainings: Training[];
}