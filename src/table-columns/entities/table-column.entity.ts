import { baseEntity } from '../../utility/base-entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Tables } from '../../tables/entities/table.entity';
import { DatatypeParameter } from '../../datatype-parameter/entities/datatype-parameter.entity';
import { ColumnConstraint } from '../../columnConstraints/entities/columnConstraint.entity';

@Entity()
export class TableColumn extends baseEntity {
  @Column()
  fieldName: string;

  @Column()
  tableId: number;

  @ManyToOne(() => Tables, (table) => table.tableColumns)
  @JoinColumn({ name: 'tableId' })
  tables: Tables;

  @Column()
  datatype: number;

  @Column({ nullable: true })
  datatypeSize: number;

  @ManyToOne(
    () => DatatypeParameter,
    (datatypeParameter) => datatypeParameter.tableColumns,
  )
  @JoinColumn({ name: 'datatype' })
  datatypeParameter: DatatypeParameter;

  @OneToMany(() => ColumnConstraint, (constraint) => constraint.tableColumns)
  constraints: ColumnConstraint[];
}
