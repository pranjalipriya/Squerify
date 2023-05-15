import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TablesService } from './tables.service';
import { CreateTableDto } from './dto/create-table.dto';
import { UpdateTableDto } from './dto/update-table.dto';
import * as jwt from 'jsonwebtoken';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { Req } from '@nestjs/common/decorators';
@ApiTags('Tables')
@ApiBearerAuth('JWT-auth')
@Controller('tables')
export class TablesController {
  constructor(private readonly tablesService: TablesService) {}

  @Post()
  async create(@Body() tableDetails: CreateTableDto) {
    try {
      const response = await this.tablesService.create(tableDetails);
      return response;
    } catch (error) {
      throw error;
    }
  }

  @Get('/exercise-tables/:id')
  async findAll(@Param('id') id: string) {
    try {
      const response = await this.tablesService.findAll(+id);
      return response;
    } catch (error) {
      throw error;
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const response = await this.tablesService.findOne(+id);
      return response;
    } catch (error) {
      throw error;
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTableDto: UpdateTableDto,
    @Req() req:Request
  ) {
    try {
      const token = req.headers.authorization;
      const slicedToken = token.split(' ').slice(1).join('');
      const payload = jwt.decode(slicedToken);
      const username=payload['username']
      const response = await this.tablesService.update(+id, updateTableDto,username);
      return response;
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const response = await this.tablesService.remove(+id);
      return response;
    } catch (error) {
      throw error;
    }
  }
}
