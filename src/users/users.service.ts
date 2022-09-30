import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Users } from './entities/users.entity';
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

    updateUserDetails(user: UserDto, id: number): Promise<UpdateResult> {
        return this.usersRepo.update({id}, {...user})
    }

}
