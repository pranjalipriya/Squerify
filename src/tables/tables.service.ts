import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { TableColumnsService } from '../table-columns/table-columns.service';

import { CreateTableDto } from './dto/create-table.dto';
import { UpdateTableDto } from './dto/update-table.dto';
import { TablesRepository } from './tables.repository';

@Injectable()
export class TablesService {
  constructor(
    private tablesRepo: TablesRepository,
    private readonly tablelColumnService: TableColumnsService,
  ) {}
  async create(tableDetails: CreateTableDto) {
    try {
      const columns = tableDetails.columns;
      if (columns) {
        const table = await this.tablesRepo.getIdByName(
          tableDetails.tableName,
          tableDetails.exerciseId,
        );
        console.log(table);
        await this.tablelColumnService.create(
          table.id,
          tableDetails.columns,
          tableDetails.modifiedBy,
        );
        return new HttpException('Table Created!!', HttpStatus.CREATED);
        //return createTable(tableDetails.tableName,tableDetails.columns);
      }
      await this.tablesRepo.create({
        tableName: tableDetails.tableName,
        modifiedBy: tableDetails.modifiedBy,
        exerciseId: tableDetails.exerciseId,
      });
      return new HttpException('Table Created!!', HttpStatus.CREATED);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  async findAll(id: number) {
    try {
      return await this.tablesRepo.get(id);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findOne(id: number) {
    try {
      return await this.tablesRepo.getOneById(id);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async update(id: number, updateTableDto: UpdateTableDto,updatedBy:string) {
    try {
      const table = await this.tablesRepo.getOneById(id);
      if (!table)
        throw new HttpException(
          'Internal Server Error!!',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      updateTableDto.modifiedBy=updatedBy;
      await this.tablesRepo.updateTable(id, updateTableDto);
      return new HttpException('Updated!!', HttpStatus.CREATED);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async remove(id: number) {
    try {
      await this.tablesRepo.remove(id);
      return new HttpException('Table Deleted', HttpStatus.CREATED);
    } catch (error) {
      throw new NotFoundException();
    }
  }
}
