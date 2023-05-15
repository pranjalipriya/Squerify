import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { ColumnConstraint } from './entities/columnConstraint.entity';
import { CreateConstraintDto } from './dto/create-constraint.dto';

@Injectable()
export class ConstraintRepository {
  constructor(
    @InjectRepository(ColumnConstraint)
    private constraintsRepo: Repository<ColumnConstraint>,
  ) {}

  async create(data: CreateConstraintDto) {
    return await this.constraintsRepo.save({ ...data });
  }

  async findAllByEntityId(entity: object) {
    return await this.constraintsRepo.find({
      where: { ...entity },
      select: { constraintParameterId: true },
    });
  }

  async findAllByColumnId(entity: object) {
    return await this.constraintsRepo.find({ where: { ...entity } });
  }

  async updateConstraints(id: object, data: object) {
    return await this.constraintsRepo.update({ ...id }, { ...data });
  }

  async deleteConstraints(entity: object) {
    return await this.constraintsRepo.softDelete({ ...entity });
  }
}
