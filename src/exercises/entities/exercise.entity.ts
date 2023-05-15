/* eslint-disable prettier/prettier */
import { Project } from '../../projects/entities/project.entity';
import { Tables } from '../../tables/entities/table.entity';
import { baseEntity } from '../../utility/base-entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Exercise extends baseEntity {
  @Column()
  exerciseName: string;

  @Column({ nullable: true, default: 0 })
  projectId: number;

  @ManyToOne(() => Project, (project) => project.exercises)
  @JoinColumn({ name: 'projectId' })
  projects: Project;

  @OneToMany(() => Tables, (table) => table.exercises)
  tables: Tables[];
}
