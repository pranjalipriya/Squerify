import { Exercise } from './entities/exercise.entity';
import { Injectable } from '@nestjs/common';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { connectDb } from '../connection/dataSource';

const repo = connectDb.getRepository(Exercise);
@Injectable()
export class ExerciseRepository {
  constructor() {}

  async showAll() {
    return await repo.find();
  }

  async create(data: CreateExerciseDto) {
    return await repo.save(data);
  }

  async read(id: object) {
    return await repo.find({ where: { ...id } });
  }

  async readAllExercises(id: object) {
    return await repo.find({ where: { ...id } });
  }

  async update(id: number, data: Partial<UpdateExerciseDto>) {
    await repo.update({ id: id }, data);
    return await repo.findOne({ where: { id: id } });
  }

  async deleteOne(id: number) {
    const deleteResponse = await repo.softDelete(id);
    return deleteResponse.affected;
  }
}
