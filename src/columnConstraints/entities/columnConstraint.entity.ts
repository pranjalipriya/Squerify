import { TableColumn } from "../../table-columns/entities/table-column.entity";
import { Tables } from "../../tables/entities/table.entity";
import { baseEntity } from "../../utility/base-entity";
import { ConstraintParameter } from "../../constraint-parameter/entities/constraint-parameter.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";

@Entity()
export class ColumnConstraint extends baseEntity {
    @Column()
    constraintParameterId: number;

    @Column()
    columnId: number;

    @Column()
    tableId: number;

    @ManyToOne(()=> TableColumn, (tableCol)=>tableCol.constraints)
    @JoinColumn({ name : 'columnId' })
    tableColumns : TableColumn

    @ManyToOne(()=> Tables , (table)=>table.constraints)
    @JoinColumn({ name : 'tableId' })
    tables : Tables;
 
    @OneToMany(() => ConstraintParameter,  constraintParameter => constraintParameter.columnConstraint) 
    @JoinColumn({ name: 'constraintParameterId' })
    constraintParameter: ConstraintParameter[];
}