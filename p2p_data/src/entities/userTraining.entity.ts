import { Entity, PrimaryGeneratedColumn, Column, ManyToOne  } from 'typeorm';
import { User } from "./user.entity";
// import { Training } from "./training.entity";


@Entity()
export class UserTraining {
 
    @PrimaryGeneratedColumn()
    id_userTraining: number;

    @Column()
    is_author: boolean;

    @Column()
    is_active: boolean;

    @ManyToOne(() => User, (user) => user.id_user)
    user: User

    // @ManyToOne(() => Training, (training) => training.id)
    // training: Training
}