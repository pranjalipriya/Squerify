import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DatatypeParameter } from './entities/datatype-parameter.entity';
import { CreateDatatypeParameterDto } from './dto/create-datatype-parameter.dto';
import { connectDb } from '../connection/dataSource';

const datatypeParameter = connectDb.getRepository(DatatypeParameter);
@Injectable()
export class DatatypeParameterRepository {
  constructor() {}

  async create(data: CreateDatatypeParameterDto) {
    return await datatypeParameter.save(data);
  }

  async findOne(id: number) {
    return datatypeParameter.findOne({ where: { id: id } });
  }

  async read() {
    return await datatypeParameter.find();
  }

  async update(id: any, data: any) {
    return await datatypeParameter.update({ id }, data);
  }

  async deleteOne(id: number) {
    const deleteResponse = await datatypeParameter.softDelete(id);
    if (!deleteResponse.affected) {
      return new HttpException('DELETED', HttpStatus.GONE);
    }
  }
}
