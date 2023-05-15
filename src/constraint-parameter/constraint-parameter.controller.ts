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
import { ConstraintParameterService } from './constraint-parameter.service';
import { CreateConstraintParameterDto } from './dto/create-constraint-parameter.dto';
import { UpdateConstraintParameterDto } from './dto/update-constraint-parameter.dto';
@ApiTags('constraint-parameter')
@ApiBearerAuth('JWT-auth')
@Controller('constraint-parameter')
export class ConstraintParameterController {
  constructor(
    private readonly constraintParameterService: ConstraintParameterService,
  ) {}

  @Post()
  async create(
    @Body() CreateConstraintParameterDto: CreateConstraintParameterDto,
  ) {
    try {
      const result = await this.constraintParameterService.create(
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
      const result = await this.constraintParameterService.findAll();
      return result;
    } catch (error) {
      throw error;
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateRelationshipParameterDto: UpdateConstraintParameterDto,
  ) {
    try {
      const result = await this.constraintParameterService.update(
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
      const result = await this.constraintParameterService.remove(+id);
      return result;
    } catch (error) {
      throw error;
    }
  }
}
