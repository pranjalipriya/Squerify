import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { TableColumnsService } from './table-columns.service';
import {
  CreateTableColumnDto,
  ColumnUpdate,
} from './dto/create-table-column.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { Req } from '@nestjs/common/decorators';
import * as jwt from 'jsonwebtoken';
@ApiTags('TableColumns')
@ApiBearerAuth('JWT-auth')
@Controller('table-columns')
export class TableColumnsController {
  constructor(private readonly tableColumnsService: TableColumnsService) {}

  @Get(':id')
  async findColumnsOfOneTable(@Param('id') id: string) {
    try {
      return await this.tableColumnsService.getColumnsByTableId(+id);
    } catch (e) {
      throw e;
    }
  }

  @Post()
  async create(@Body() createTableColumnDto: CreateTableColumnDto) {
    try {
      const response = await this.tableColumnsService.create(
        createTableColumnDto.tableId,
        createTableColumnDto.columns,
        createTableColumnDto.modifiedBy,
      );
      return response;
    } catch (e) {
      throw e;
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTableColumn: ColumnUpdate, 
  @Req() req:Request) {
    try {
      const token = req.headers.authorization;
      const slicedToken = token.split(' ').slice(1).join('');
      const payload = jwt.decode(slicedToken);
      const username=payload['username']
      return this.tableColumnsService.update(+id, updateTableColumn,username);
    } catch (e) {
      throw e;
    }
  }

  @Delete(':columnId/:tableId/:constraintParameterId')
  removeConstraints(
    @Param('columnId', ParseIntPipe) columnId: number,
    @Param('tableId', ParseIntPipe) tableId: number,
    @Param('constraintParameterId', ParseIntPipe) constraintParameterId: number,
  ) {
    try {
      return this.tableColumnsService.deleteConstraints(
        columnId,
        tableId,
        constraintParameterId,
      );
    } catch (e) {
      throw e;
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      return this.tableColumnsService.remove(+id);
    } catch (e) {
      throw e;
    }
  }
}
