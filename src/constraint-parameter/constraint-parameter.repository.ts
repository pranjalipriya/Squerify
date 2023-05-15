import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConstraintParameter } from './entities/constraint-parameter.entity';
import { CreateConstraintParameterDto } from './dto/create-constraint-parameter.dto';
import { UpdateConstraintParameterDto } from './dto/update-constraint-parameter.dto';
import { connectDb } from '../connection/dataSource';
const constraintParameter = connectDb.getRepository(ConstraintParameter);
@Injectable()
export class ConstraintParameterRepository {
  constructor() {}

  async create(data: CreateConstraintParameterDto) {
    return await constraintParameter.save(data);
  }

  async read() {
    return await constraintParameter.find();
  }

  async update(id: number, data: UpdateConstraintParameterDto) {
    return await constraintParameter.update({ id }, data);
  }

  async deleteOne(id: number) {
    const deleteResponse = await constraintParameter.softDelete(id);
    if (!deleteResponse.affected) {
      return new HttpException('DELETED', HttpStatus.GONE);
    }
  }
  async getById(id: number) {
    return await constraintParameter.findOne({ where: { id: id } });
  }
}
