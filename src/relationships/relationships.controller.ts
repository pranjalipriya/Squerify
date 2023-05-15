import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RelationshipsService } from './relationships.service';
import { CreateRelationshipDto } from './dto/create-relationship.dto';
import { UpdateRelationshipDto } from './dto/update-relationship.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Req } from '@nestjs/common/decorators';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';
@ApiTags('Relationships')
@ApiBearerAuth('JWT-auth')
@Controller('relationships')
export class RelationshipsController {
  constructor(private readonly relationshipsService: RelationshipsService) {}

  @Post()
  async create(@Body() createRelationshipDto: CreateRelationshipDto) {
    try {
      const response = await this.relationshipsService.createRelationships(
        createRelationshipDto,
      );
      return response;
    } catch (e) {
      throw e;
    }
  }

  @Get()
  async findAll() {
    try {
      const response = await this.relationshipsService.findAllRelationships();
      return response;
    } catch (e) {
      throw e;
    }
  }

  @Get('/:relationshipId')
  async findOne(@Param('relationshipId') id: string) {
    try {
      const response = await this.relationshipsService.findOneRelationshipById(
        +id,
      );
      return response;
    } catch (e) {
      throw e;
    }
  }

  @Get('/:sourceTableId')
  async findOneBySourceTableId(@Param('sourceTableId') id: string) {
    try {
      const response =
        await this.relationshipsService.findRelationshipsBySourceTableId(+id);
      return response;
    } catch (e) {
      throw e;
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateRelationshipDto: UpdateRelationshipDto,
    @Req() req:Request
  ) {
    try {
      const token = req.headers.authorization;
      const slicedToken = token.split(' ').slice(1).join('');
      const payload = jwt.decode(slicedToken);
      const username=payload['username']
      const response = await this.relationshipsService.updatRelationships(
        +id,
        updateRelationshipDto,
        username
      );
      return response;
    } catch (e) {
      throw e;
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const response = await this.relationshipsService.removeOne(+id);
      return response;
    } catch (e) {
      throw e;
    }
  }
}
