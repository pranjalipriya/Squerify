import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common/exceptions';
import { TableColumnsService } from '../table-columns/table-columns.service';
import { CreateRelationshipDto } from './dto/create-relationship.dto';
import { UpdateRelationshipDto } from './dto/update-relationship.dto';
import { RelationshipsRepository } from './relationships.repository';

@Injectable()
export class RelationshipsService {
  constructor(private relationshipsRepository: RelationshipsRepository,
    private tableColumnService : TableColumnsService) {}

  async createRelationships(createRelationshipDto: CreateRelationshipDto) {
    try {
      const sourceColumn = await this.tableColumnService.getColumnsByTableId(createRelationshipDto.sourceTableId);
      await this.relationshipsRepository.create({...createRelationshipDto , sourceColumnId : sourceColumn[0].id});
      return new HttpException('CREATED', HttpStatus.ACCEPTED);
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException();
    }
  }
  async findAllRelationships() {
    try {
      const relationships = this.relationshipsRepository.showAll();
      return relationships;
    } catch (e) {
      console.log(e);
      throw new NotFoundException();
    }
  }

  async findOneRelationshipById(relationshipId: number) {
    try {
      const relationship = await this.relationshipsRepository.read({
        relationshipId: relationshipId,
      });
      return relationship;
    } catch (e) {
      console.log(e);
      throw new NotFoundException();
    }
  }
  async findRelationshipsBySourceTableId(tableId: number) {
    try {
      const relationship = await this.relationshipsRepository.read({
        sourceTableId: tableId,
      });
      return relationship;
    } catch (e) {
      console.log(e);
      throw new NotFoundException();
    }
  }

  async updatRelationships(
    relationshipId: number,
    updateRelationshipDto: UpdateRelationshipDto,
    updatedBy:string
  ) {
    try {
      updateRelationshipDto.modifiedBy=updatedBy;
      await this.relationshipsRepository.update(
        relationshipId,
        updateRelationshipDto,
      );
      return new HttpException('UPDATED', HttpStatus.ACCEPTED);
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException();
    }
  }

  async removeOne(id: number) {
    try {
      await this.relationshipsRepository.deleteOne(id);
      return new HttpException('DELETED', HttpStatus.GONE);
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException();
    }
  }
}
