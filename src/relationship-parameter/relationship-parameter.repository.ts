import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RelationshipParameter } from './entities/relationship-parameter.entity';
import { CreateRelationshipParameterDto } from './dto/create-relationship-parameter.dto';
import { connectDb } from '../connection/dataSource';

const repo = connectDb.getRepository(RelationshipParameter);
@Injectable()
export class RelationshipParameterRepository {
  constructor() {}

  async create(data: CreateRelationshipParameterDto) {
    return await repo.save(data);
  }

  async read() {
    return await repo.find();
  }

  async update(id: number, data: any) {
    return await repo.update({ id }, data);
  }

  async deleteOne(id: number) {
    const deleteResponse = await repo.softDelete(id);
    if (!deleteResponse.affected) {
      return new HttpException('DELETED', HttpStatus.GONE);
    }
  }
}
