import {
  Injectable,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CreateRelationshipParameterDto } from './dto/create-relationship-parameter.dto';
import { UpdateRelationshipParameterDto } from './dto/update-relationship-parameter.dto';
import { RelationshipParameterRepository } from './relationship-parameter.repository';

@Injectable()
export class RelationshipParameterService {
  constructor(
    private relationshipParameterRepo: RelationshipParameterRepository,
  ) {}
  async create(createRelationshipParameterDto: CreateRelationshipParameterDto) {
    try {
      await this.relationshipParameterRepo.create(
        createRelationshipParameterDto,
      );
      return new HttpException(
        'RELATIONSHIP PARAMETER ADDED',
        HttpStatus.CREATED,
      );
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      console.log('hujcdw');
      return await this.relationshipParameterRepo.read();
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, updateRelationshipParameterDto: UpdateRelationshipParameterDto) {
    try {
      await this.relationshipParameterRepo.update(
        id,
        updateRelationshipParameterDto,
      );
      return new HttpException('RELATIONSHIP PARAMETER UPDATED', HttpStatus.OK);
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number) {
    try {
      await this.relationshipParameterRepo.deleteOne(id);
      return new HttpException('RELATIONSHIP PARAMETER DELETED', HttpStatus.OK);
    } catch (error) {
      throw error;
    }
  }
}
