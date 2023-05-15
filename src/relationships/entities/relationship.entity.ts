import { RelationshipParameter } from '../../relationship-parameter/entities/relationship-parameter.entity';
import { TableColumn } from '../../table-columns/entities/table-column.entity';
import { Tables } from '../../tables/entities/table.entity';
import { baseEntity } from '../../utility/base-entity';
import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
  OneToOne,
} from 'typeorm';

@Entity('Table_Relationships')
export class Relationship extends baseEntity {
  @Column()
  sourceTableId: number;
  @ManyToOne(() => Tables, (table) => table.sourceXYZ)
  @JoinColumn({ name: 'sourceTableId' })
  sourceTables: Tables;

  @Column()
  targetTableId: number;
  @ManyToOne(() => Tables, (table) => table.targetXYZ)
  @JoinColumn({ name: 'targetTableId' })
  targetTables: Tables;

  @Column()
  sourceColumnId: number;
  @OneToOne(() => TableColumn)
  @JoinColumn({ name: 'sourceColumnId' })
  sourceTableColumn: TableColumn;

  @Column()
  targetColumnName : string
 
  @Column()
  relationshipType: number;
  @ManyToOne(() => RelationshipParameter)
  @JoinColumn({ name: 'relationshipType' })
  relationshipParameter: RelationshipParameter;
}
