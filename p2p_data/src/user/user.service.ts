import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { UserRepository } from './user.repository';
// import { CreateUserDto } from './dto/create-user.dto';
// import { User } from '../entities/user.entity';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {

    private users: User[] = [];
    private user: User;


    findOne(): User {
        return this.user;
    }

    findByEmail(email: string): User {
        return this.user;
    }

    findAll(): User[] {
        return this.users;
    }

    create(): User[] {
        return this.users;
    }




    // constructor(
    //     @InjectRepository(UserRepository)
    //     private readonly userRepository: UserRepository,
    // ) { }

    // async findAll(): Promise<User[]> {
    //     return this.userRepository.find();
    // }

    // async create(createUserDto: CreateUserDto): Promise<User> {
    //     const user = this.userRepository.create(createUserDto);
    //     return this.userRepository.save(user);
    // }
}
