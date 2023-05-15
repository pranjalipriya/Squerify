import { ColumnConstraint } from '../../columnConstraints/entities/columnConstraint.entity';
import { Exercise } from '../../exercises/entities/exercise.entity';
import { Relationship } from '../../relationships/entities/relationship.entity';
import { TableColumn } from '../../table-columns/entities/table-column.entity';
import { baseEntity } from '../../utility/base-entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
@Unique(['tableName', "exerciseId"])
export class Tables extends baseEntity {
    @Column({ nullable: true })
    tableName: string;
    @Column({ nullable: true })
    exerciseId: number;
    @Column()
    modifiedBy: string;
    @ManyToOne(() => Exercise, (exercise) => exercise.tables)
    @JoinColumn({ name: 'exerciseId' })
    exercises: Exercise[];

    @OneToMany(() => TableColumn, (tableColumn) => tableColumn.tables)
    tableColumns: TableColumn[]

    @OneToMany(() => Relationship, (relationship) => relationship.sourceTables)
    sourceXYZ: Relationship[]

    @OneToMany(() => Relationship, (relationship) => relationship.targetTables)
    targetXYZ: Relationship[]

    @OneToMany(()=>ColumnConstraint , (constraint)=>constraint.tables)
    constraints : ColumnConstraint[]
}