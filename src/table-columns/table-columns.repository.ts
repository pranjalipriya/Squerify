import { Injectable } from '@nestjs/common';
import { connectDb } from '../connection/dataSource';
import { IColumn } from './dto/create-table-column.dto';
import { TableColumn } from './entities/table-column.entity';

const repo = connectDb.getRepository(TableColumn);
@Injectable()
export class TableColumnRepository {
  constructor() {}

  create(tableId: number, createTableColumnDto: IColumn[], modifiedBy: string) {
    return repo
      .createQueryBuilder()
      .insert()
      .into(TableColumn)
      .values(
        createTableColumnDto.map((data) => ({
          tableId: tableId,
          fieldName: data.fieldName,
          datatype: +data.datatype,
          datatypeSize: data.datatypeSize,
          modifiedBy: modifiedBy,
        })),
      )
      .execute();
  }

  async getColumnsByTableId(tableId: number) {
    return await repo
      .createQueryBuilder('table-columns')
      .leftJoinAndSelect('table-columns.constraints', 'constraints')
      .where({ tableId: tableId })
      .getMany();
  }

  async getColumnsForExportingTable(tableId: number) {
    return await repo.find({
      select: { fieldName: true, datatype: true },
      where: { tableId: tableId },
    });
  }

  async getColumnId(tableId: number, array: any) {
    const newArray = await array.map(async (obj: any) => {
      return {
        columnId: await repo
          .findOne({
            where: { tables: { id: tableId }, fieldName: obj.fieldName },
            relations: ['tables'],
          })
          .then((data) => {
            console.log(data.id);
            return data.id;
          }),
        ...obj,
      };
    });
    return newArray;
  }

  async updateAColumn(id: number, obj: object) {
    return await repo.update({ id: id }, obj);
  }

  async delete(id: number) {
    const deleteResponse = await repo.softDelete(id);
    if (!deleteResponse.affected) {
      return 'NOT FOUND';
    }
    return true;
  }

  getColumnIdByName(tableid: number, name: string) {
    return repo.find({
      select: {
        id: true,
      },
      where: {
        tableId: tableid,
        fieldName: name,
      },
    });
  }
}
