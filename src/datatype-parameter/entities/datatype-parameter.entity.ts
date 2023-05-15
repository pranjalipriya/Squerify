import { TableColumn } from '../../table-columns/entities/table-column.entity';
import { baseEntity } from '../../utility/base-entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class DatatypeParameter extends baseEntity {
  @Column()
  name: string;

  @OneToMany(() => TableColumn, (tableColumn) => tableColumn.datatypeParameter)
  tableColumns: TableColumn[];
}
