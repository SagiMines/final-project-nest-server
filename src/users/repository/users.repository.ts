import { Users } from "../entities/users.entity";
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Users)
export class UsersRepository extends Repository<Users> {
    findById(id: number) {
        return this.findOne({id})
    }
}