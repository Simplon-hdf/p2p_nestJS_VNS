import { Entity, PrimaryGeneratedColumn, Column  } from 'typeorm';


@Entity()
export class Tag {
 
    @PrimaryGeneratedColumn()
    id_tag: number;

    @Column()
    name: string;
    

}