import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DatatypeParameterRepository } from './datatype-parameter.repository';
import { CreateDatatypeParameterDto } from './dto/create-datatype-parameter.dto';

@Injectable()
export class DatatypeParameterService {
  constructor(private DatatypeParameterRepo: DatatypeParameterRepository) {}

  async create(CreateConstraintParameterDto: CreateDatatypeParameterDto) {
    try {
      await this.DatatypeParameterRepo.create(CreateConstraintParameterDto);
      return new HttpException('DATATYPE PARAMETER ADDED', HttpStatus.CREATED);
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number) {
    return this.DatatypeParameterRepo.findOne(id);
  }
  async findAll() {
    try {
      return await this.DatatypeParameterRepo.read();
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, updateRelationshipParameterDto: any) {
    try {
      await this.DatatypeParameterRepo.update(
        id,
        updateRelationshipParameterDto,
      );
      return new HttpException('DATATYPE PARAMETER UPDATED', HttpStatus.OK);
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number) {
    try {
      await this.DatatypeParameterRepo.deleteOne(id);
      return new HttpException('DATATYPE PARAMETER DELETED', HttpStatus.OK);
    } catch (error) {
      throw error;
    }
  }
}
