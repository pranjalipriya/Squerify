import { Relationship } from "../../relationships/entities/relationship.entity";
import { baseEntity } from "../../utility/base-entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from "typeorm";

@Entity()
export class RelationshipParameter extends baseEntity{
    @Column()
    name: string;

    @OneToMany(() => Relationship , relationship =>relationship.relationshipParameter)
    relationship:Relationship;    

}
