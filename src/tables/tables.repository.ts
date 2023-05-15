import { Injectable } from '@nestjs/common';
import { connectDb } from '../connection/dataSource';
import { UpdateTableDto } from './dto/update-table.dto';
import { Tables } from './entities/table.entity';

const repo = connectDb.getRepository(Tables);
@Injectable()
export class TablesRepository {
  constructor() {}

  create(tableName: object) {
    return repo.save(tableName);
  }

  get(id: number) {
    return repo
      .createQueryBuilder('tables')
      .leftJoinAndSelect('tables.tableColumns', 'tableColumns')
      .leftJoinAndSelect('tableColumns.constraints', 'constraints')
      .where({ exerciseId: id })
      .getMany();
  }

  getIdByName(tableName: string, exerciseId: number) {
    return repo.findOne({
      where: { tableName: tableName, exerciseId: exerciseId },
    });
  }

  getOneById(id: number) {
    // return repo.find({ where: { id: id } });
    return repo
      .createQueryBuilder('tables')
      .leftJoinAndSelect('tables.tableColumns', 'tableColumns')
      .leftJoinAndSelect('tables.constraints', 'constraints')
      .where({ id: id })
      .getOne();
  }

  updateTable(id: number, updateTableDto: UpdateTableDto) {
    return repo.update({ id: id }, updateTableDto);
  }

  remove(id: number) {
    return repo.softDelete(id);
  }
}
