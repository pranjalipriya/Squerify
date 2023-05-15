import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { DatatypeParameterService } from './datatype-parameter.service';
import { CreateDatatypeParameterDto } from './dto/create-datatype-parameter.dto';
@ApiTags('datatype-parameter')
@ApiBearerAuth('JWT-auth')
@Controller('datatype-parameter')
export class DatatypeParameterController {
  constructor(
    private readonly datatypeParameterService: DatatypeParameterService,
  ) {}

  @Post()
  async create(
    @Body() CreateConstraintParameterDto: CreateDatatypeParameterDto,
  ) {
    try {
      const result = await this.datatypeParameterService.create(
        CreateConstraintParameterDto,
      );
      return result;
    } catch (error) {
      throw error;
    }
  }

  @Get()
  async findAll() {
    try {
      const result = await this.datatypeParameterService.findAll();
      return result;
    } catch (error) {
      throw error;
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateRelationshipParameterDto: any,
  ) {
    try {
      const result = await this.datatypeParameterService.update(
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
      const result = await this.datatypeParameterService.remove(+id);
      return result;
    } catch (error) {
      throw error;
    }
  }
}
