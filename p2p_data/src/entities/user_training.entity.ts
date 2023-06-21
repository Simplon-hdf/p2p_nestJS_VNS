import { Entity, PrimaryGeneratedColumn, Column, ManyToOne  } from 'typeorm';
import { User } from "./user.entity";
import { Training } from "./training.entity";


@Entity()
export class User_training {
 
    @PrimaryGeneratedColumn()
    id_user_training: number;

    @Column({ default: false })
    is_author: boolean;

    @Column({ default: true })
    is_active: boolean;

    @ManyToOne(() => User, (user) => user.user_trainings)
    user: User

    @ManyToOne(() => Training, (training) => training.user_trainings)
    training: Training
    
}