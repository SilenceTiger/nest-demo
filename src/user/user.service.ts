import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

import Pagination, { PaginationData } from '../utils/Pagination';

@Injectable()
export class UserService {
  // private readonly users: User[];
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findPage(query: any): Promise<PaginationData> {
    let pagination = new Pagination(
      this.usersRepository,
      +query.page,
      +query.size,
    );
    return await pagination.excute();

    // let key = 'lucong'
    // let pagination = new Pagination(
    //   this.usersRepository,
    //   +query.page,
    //   +query.size,
    //   {
    //     state: 't.username like :name',
    //     value: {
    //       name: `${key}%`
    //     }
    //   }
    // );
    // return await pagination.excute()
    //return pagination.getData();
    // let total = this.usersRepository.findAndCount();
    // return this.usersRepository
    //   .createQueryBuilder('user')
    //   .select('count(*)')
    //   .where('user.id LIKE :id', { id: 1 })
    //   .getCount();
    // return this.usersRepository
    //   .createQueryBuilder('user')
    //   .skip((query.page - 1) * query.size)
    //   .take(query.size)
    //   .where('user.id = :id', { id: 1 })
    //   .getMany();
    // var data = await getRepository(User)
    //   .createQueryBuilder('user')
    //   .where('user.firstName like :name', { name: `%${firstName}%` })
    //   .getMany();
  }

  findOne(username: string): Promise<User> {
    return this.usersRepository.findOne({ username: username });
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
