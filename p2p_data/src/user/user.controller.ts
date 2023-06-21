import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
// import { CreateUserDto } from './dto/create-user.dto';
import { User } from '../entities/user.entity';


@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) { }

    @Get()
    async findAll(): Promise<User[]> {
        return this.userService.findAll();
    }

    @Get()
    async findOne(): Promise<User> {
        return this.userService.findOne();
    }

    // @Get()
    // async findByEmail(): Promise<User> {
    //     return this.userService.findOne({ email });
    // }


    // @Post()
    // async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    //     return this.userService.create(createUserDto);
    // }
}
