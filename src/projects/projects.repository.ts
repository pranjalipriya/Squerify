import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.entity';
import { connectDb } from '../connection/dataSource';
import { Not } from 'typeorm';

const repo = connectDb.getRepository(Project);
@Injectable()
export default class ProjectRepository {
  constructor() {}

  async create(data: CreateProjectDto) {
    return await repo.save(data);
  }

  async read(id: object) {
    return await repo.find({ where: { ...id } });
  }

  async readAll() {
    return await repo
      .createQueryBuilder('projects')
      .leftJoinAndSelect('projects.exercises', 'exercises')
      .leftJoinAndSelect('exercises.tables', 'tables')
      .leftJoinAndSelect('tables.tableColumns', 'tableColumns')
      .getMany();
  }

  async readAllProjects(userId: number) {
    return await repo.find({
      where: { userId: userId, projectName: Not('default') },
    });
  }

  async update(id: number, data: Partial<UpdateProjectDto>) {
    await repo.update({ id: id }, data);
    return await repo.findOne({ where: { id: id } });
  }

  async deleteOne(id: number) {
    const deleteResponse = await repo.softDelete(id);
    if (!deleteResponse.affected) {
      return 'NOT FOUND';
    }
  }
}
