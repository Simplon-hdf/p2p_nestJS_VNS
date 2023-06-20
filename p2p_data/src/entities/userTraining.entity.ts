import { Entity, PrimaryGeneratedColumn, Column, ManyToOne  } from 'typeorm';
import { User } from "./user.entity";
// import { Training } from "./training.entity";


@Entity()
export class UserTraining {
 
    @PrimaryGeneratedColumn()
    id_userTraining: number;

    @Column({ default: false })
    is_author: boolean;

    @Column({ default: true })
    is_active: boolean;

    @ManyToOne(() => User, (user) => user.id_user)
    user: User

    // @ManyToOne(() => Training, (training) => training.id)
    // training: Training
}