/* eslint-disable prettier/prettier */
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class baseEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @CreateDateColumn({
    type: 'time with time zone',
  })
  created_at: Date;
  @UpdateDateColumn({
    type: 'time with time zone',
  })
  updated_at: Date;
  @Column({ nullable: false, default: 'ADMIN' })
  modifiedBy: string;
  @DeleteDateColumn()
  deletedAt?: Date;
}
