import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { connectDb } from '../connection/dataSource';

const repo = connectDb.getRepository(User);
@Injectable()
export class UsersRepository {
  constructor() {}

  async showAll() {
    return await repo.find();
  }

  async create(data: CreateUserDto) {
    return await repo.save(data);
  }

  async read(id: object) {
    return await repo.findOne({ where: { ...id } });
  }

  async update(id: number, data: Partial<UpdateUserDto>) {
    await repo.update({ id: id }, data);
    return await repo.findOne({ where: { id: id } });
  }

  async remove(id: number) {
    return await repo.softDelete(id);
  }
}
