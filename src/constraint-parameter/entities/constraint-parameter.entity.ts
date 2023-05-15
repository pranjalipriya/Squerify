import { ColumnConstraint } from '../../columnConstraints/entities/columnConstraint.entity';
import { baseEntity } from '../../utility/base-entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class ConstraintParameter extends baseEntity {
  @Column()
  name: string;

  @ManyToOne(
    () => ColumnConstraint,
    (columnConstraint) => columnConstraint.constraintParameter,
  )
  columnConstraint: ColumnConstraint[];
}
