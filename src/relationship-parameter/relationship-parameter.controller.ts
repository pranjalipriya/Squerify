import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { RelationshipParameterService } from './relationship-parameter.service';
import { CreateRelationshipParameterDto } from './dto/create-relationship-parameter.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Patch } from '@nestjs/common/decorators';
import { UpdateRelationshipParameterDto } from './dto/update-relationship-parameter.dto';
@ApiTags('Relationship-Parameter')
@ApiBearerAuth('JWT-auth')
@Controller('relationship-parameter')
export class RelationshipParameterController {
  constructor(
    private readonly relationshipParameterService: RelationshipParameterService,
  ) {}

  @Post()
  async create(
    @Body() createRelationshipParameterDto: CreateRelationshipParameterDto,
  ) {
    try {
      const result = await this.relationshipParameterService.create(
        createRelationshipParameterDto,
      );
      return result;
    } catch (error) {
      throw error;
    }
  }

  @Get()
  async findAll() {
    try {
      const result = await this.relationshipParameterService.findAll();
      return result;
    } catch (error) {
      throw error;
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateRelationshipParameterDto: UpdateRelationshipParameterDto,
  ) {
    try {
      const result = await this.relationshipParameterService.update(
        +id,
        updateRelationshipParameterDto,
      );
      return result;
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const result = await this.relationshipParameterService.remove(+id);
      return result;
    } catch (error) {
      throw error;
    }
  }
}
