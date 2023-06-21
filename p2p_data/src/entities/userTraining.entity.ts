import { Entity, PrimaryGeneratedColumn, Column, ManyToOne  } from 'typeorm';
import { User } from "./user.entity";
import { Training } from "./training.entity";


@Entity()
export class UserTraining {
 
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: false })
    isAuthor: boolean;

    @Column({ default: true })
    isActive: boolean;

    @ManyToOne(() => User, (user) => user.userTrainings)
    user: User

    @ManyToOne(() => Training, (training) => training.userTrainings)
    training: Training
}