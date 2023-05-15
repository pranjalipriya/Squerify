import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common/exceptions';
import { ConstraintsService } from '../columnConstraints/columnConstraints.service';
import { IColumn, ColumnUpdate } from './dto/create-table-column.dto';
import { TableColumnRepository } from './table-columns.repository';

@Injectable()
export class TableColumnsService {
  constructor(
    private tableColumnRepo: TableColumnRepository,
    private constraintService: ConstraintsService,
  ) {}

  async create(
    tableId: number,
    createTableColumnDto: IColumn[],
    modifiedBy: string,
  ) {
    try {
      await this.tableColumnRepo.create(
        tableId,
        createTableColumnDto,
        modifiedBy,
      );

      createTableColumnDto.forEach(async (obj) => {
        let columnid = (
          await this.tableColumnRepo.getColumnIdByName(tableId, obj.fieldName)
        )?.[0].id;
        this.constraintService.create({ tableId, ...obj, id: columnid });
      });

      return new HttpException(
        'COLUMNS CREATED SUCCESSFULLY',
        HttpStatus.CREATED,
      );
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async update(id: number, updateTableColumn: ColumnUpdate,updatedBy:string) {
    try {
      const requestObject = {
        fieldName: updateTableColumn.fieldName,
        tableId: updateTableColumn.tableId,
        datatype: updateTableColumn.datatype,
        datatypeSize: updateTableColumn.datatypeSize,
        modifiedBy : updatedBy
      };
      await this.tableColumnRepo.updateAColumn(id, requestObject);

      if (updateTableColumn.constraints.length > 0) {
        await this.constraintService.updateAllByColumnId(
          id,
          updateTableColumn.constraints,
          updateTableColumn.tableId,
          updatedBy
        );
      }
      return new HttpException('column updated successfully', HttpStatus.OK);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async remove(id: number) {
    try {
      if (await this.tableColumnRepo.delete(id))
        return new HttpException(
          'column deleted successfully',
          HttpStatus.GONE,
        );
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async getColumnsByTableId(id: number) {
    try {
      const columnData = await this.tableColumnRepo.getColumnsByTableId(id);
      return columnData;
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async getColumnsForExportingTable(id: number) {
    try {
      const tableColumns =
        await this.tableColumnRepo.getColumnsForExportingTable(id);
      return tableColumns;
    } catch (e) {
      throw new NotFoundException();
    }
  }

  async findColumnIdByfieldName(id: number, fieldName: string) {
    try {
      const cid = await this.tableColumnRepo.getColumnId(id, fieldName);
      return cid.columnId;
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async deleteConstraints(
    columnId: number,
    tableId: number,
    constraintParameterId: number,
  ) {
    try {
      const didDelete = await this.constraintService.removeConstraints(
        columnId,
        tableId,
        constraintParameterId,
      );
      if (didDelete) {
        return new HttpException(
          'constraints deleted successfully',
          HttpStatus.GONE,
        );
      }
    } catch (e) {
      throw new NotFoundException();
    }
  }
}
