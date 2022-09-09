import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './entities/users.entity';
import { UsersRepository } from './repository/users.repository';
import { UserDto } from './user-dto';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(Users) private usersRepo: Repository<Users>) {}

    getUsers(): Promise<Users[]> {
        return this.usersRepo.find();
    }

    addUser(newUser: UserDto): Promise<Users> {
        return this.usersRepo.save(newUser)
    }

    findById(id: number) {
        return this.usersRepo.findOne({id})
    }

    findByEmail(email: string) {
        return this.usersRepo.findOne({email})
    }

}
