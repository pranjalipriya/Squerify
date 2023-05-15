import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConstraintParameterRepository } from './constraint-parameter.repository';
import { CreateConstraintParameterDto } from './dto/create-constraint-parameter.dto';

@Injectable()
export class ConstraintParameterService {
  constructor(private constraintParameterRepo: ConstraintParameterRepository) {}

  async create(CreateConstraintParameterDto: CreateConstraintParameterDto) {
    try {
      await this.constraintParameterRepo.create(CreateConstraintParameterDto);
      return new HttpException(
        'CONSTRAINT PARAMETER ADDED',
        HttpStatus.CREATED,
      );
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      return await this.constraintParameterRepo.read();
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, updateRelationshipParameterDto: any) {
    try {
      await this.constraintParameterRepo.update(
        id,
        updateRelationshipParameterDto,
      );
      return new HttpException('CONSTRAINT PARAMETER UPDATED', HttpStatus.OK);
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number) {
    try {
      await this.constraintParameterRepo.deleteOne(id);
      return new HttpException('CONSTRAINT PARAMETER DELETED', HttpStatus.OK);
    } catch (error) {
      throw error;
    }
  }

  //find constraint with tablecolumn id
  async findOne(id: number) {
    try {
      return await this.constraintParameterRepo.getById(id);
    } catch (e) {
      throw e;
    }
  }
}
