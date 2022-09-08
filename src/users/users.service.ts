import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './entities/users.entity';
import { UsersRepository } from './repository/users.repository';
import { UserDto } from './user-dto';

@Injectable()
export class UsersService {
    // constructor(private usersRepo: UsersRepository) {}
    constructor(@InjectRepository(Users) private usersRepo: Repository<Users>) {}

    // private _users: UserDto[] = [
    //     {
    //         id: 1,
    //         firstName: 'Sagi',
    //         lastName: 'Mines',
    //         address: 'Haonot 6',
    //         country: 'Israel',
    //         city: 'Ashkelon',
    //         postalCode: '7836015',
    //         phone: '0527643634',
    //         email: 'sagi3444@gmail.com',
    //         password: '435tt$%T%$%^bfgbw4rtghfghKkKKOor'
    //     }
    // ]

    getUsers(): Promise<Users[]> {
        return this.usersRepo.find();
    }

    addUser(newUser: UserDto): Promise<Users> {
        return this.usersRepo.save(newUser)
    }

    // findById(id:number): Promise<Users> {
    //     return this.usersRepo.findById(id)
    // }
    findById(id: number) {
        return this.usersRepo.findOne({id})
    }

    findByEmail(email: string) {
        return this.usersRepo.findOne({email})
    }


    // getUser(id: number): UserDto | undefined {
    //     const found = this._users.find(user => user.id === id)
    //     return found
    // }
}
