import { Project } from '../../projects/entities/project.entity';
import { baseEntity } from '../../utility/base-entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class User extends baseEntity{
  @Column()
  name: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @OneToMany(() => Project,(project) => project.users)
  projects: Project[];
}