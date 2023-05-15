import { Injectable } from '@nestjs/common';
import { connectDb } from '../connection/dataSource';
import { CreateRelationshipDto } from './dto/create-relationship.dto';
import { UpdateRelationshipDto } from './dto/update-relationship.dto';
import { Relationship } from './entities/relationship.entity';

const repo = connectDb.getRepository(Relationship);
@Injectable()
export class RelationshipsRepository {
  constructor() {}

  async create(data: any) {
    return await repo.save(data);
  }
  async showAll() {
    return await repo.find();
  }
  async read(id: object) {
    return await repo.findOne({ where: { ...id } });
  }
  async update(id: number, data: Partial<UpdateRelationshipDto>) {
    await repo.update({ id: id }, data);
    return await repo.findOne({ where: { id: id } });
  }
  async deleteOne(id: number) {
    return await repo.softDelete(id);
  }
}
