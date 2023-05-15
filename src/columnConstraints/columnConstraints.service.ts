import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ConstraintRepository } from './columnConstraints.repository';
import { IConstraint } from './dto/create-constraint.dto';

@Injectable()
export class ConstraintsService {
  constructor(private constraintRepo: ConstraintRepository) {}

  async create(data: IConstraint) {
    try {
      data.constraints.forEach(async (constraint) => {
        await this.constraintRepo.create({
          tableId: +data.tableId,
          constraintParameterId: +constraint,
          columnId: +data.id,
        });
      });
      return true;
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  async getAllByEntityId(tableId: number) {
    try {
      return await this.constraintRepo.findAllByEntityId({ tableId: tableId });
    } catch (e) {
      throw new NotFoundException();
    }
  }

  async getAllByColumnId(columnId: number) {
    try {
      return await this.constraintRepo.findAllByEntityId({
        columnId: columnId,
      });
    } catch (e) {
      throw new NotFoundException();
    }
  }

  //UPDATE COLUMN-CONSTRAINTS WITH IT'S COLUMN ID AND TABLE ID AND CONSTRAINTS BODY AS ARRAY
  async updateAllByColumnId(columnId: number , constraints: number[] , tableId: number , updatedBy:string) 
    {
    try {
    for(let index = 0 ; index < constraints.length ; index++){
    await this.constraintRepo.deleteConstraints({
      columnId: columnId,
      tableId: tableId,
      constraintParameterId: constraints[index],
    });
  }
  for (let index = 0; index < constraints.length; index++) {
          await this.constraintRepo.create({
            tableId: tableId,
            constraintParameterId: constraints[index],
            columnId: columnId,
            modifiedBy:updatedBy
          });
        }
    } catch (e) {
      throw new NotFoundException();
    }
  }

  async removeConstraints(
    columnId: number,
    tableId: number,
    constraintParameterId: number,
  ) {
    try {
      return await this.constraintRepo.deleteConstraints({
        columnId: columnId,
        tableId: tableId,
        constraintParameterId: constraintParameterId,
      });
    } catch (e) {
      throw new NotFoundException();
    }
  }
}
