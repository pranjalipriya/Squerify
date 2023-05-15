import { Exercise } from '../../exercises/entities/exercise.entity';
import { User } from '../../users/entities/user.entity';
import { baseEntity } from '../../utility/base-entity';
import {
  Column,
  Entity,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Project extends baseEntity {
  @Column()
  projectName: string;
  @Column()
  userId: number;

  @OneToMany(() => Exercise, (exercise) => exercise.projects)
  exercises: Exercise[];

  @ManyToOne(() => User, (user) => user.projects)
  @JoinColumn({ name: 'userId' })
  users: User;
}
