import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ExerciseRepository } from './exercises.repository';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { ProjectsService } from '../projects/projects.service';
import { forwardRef } from '@nestjs/common/utils/forward-ref.util';
import { Inject } from '@nestjs/common/decorators';

@Injectable()
export class ExercisesService {
  constructor(
    private exerciseRepo: ExerciseRepository,
    @Inject(forwardRef(() => ProjectsService))
    private projectService: ProjectsService,
  ) {}

  //CREATING AN EXERCISE WITH CREATE EXERCISE REQUEST OBJECT
  async createExercise(createExerciseDto: CreateExerciseDto, userId: number) {
    try {
      if (createExerciseDto.projectId != null) {
        await this.exerciseRepo.create(createExerciseDto);
        return new HttpException('EXERCISE CREATED', HttpStatus.CREATED);
      } else {
        const defaultProject = await this.projectService.getDefault(userId);
        createExerciseDto.projectId = defaultProject[0].id;
        await this.exerciseRepo.create(createExerciseDto);
        return new HttpException('EXERCISE CREATED', HttpStatus.CREATED);
      }
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  //SHOW ALL EXERCISES
  async findAllExercises() {
    try {
      const exercises = await this.exerciseRepo.showAll();
      return exercises;
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  //SHOW ALL THE EXERCISES THAT BELONGS TO A SINGLE USER
  async findExercisesByUserId(userId: number) {
    try {
      const exercises = await this.exerciseRepo.read({ userId: userId });
      return exercises;
    } catch (e) {
      throw new NotFoundException();
    }
  }

  //FIND ONE EXERCISE BY IT'S OWN EXERCISE ID
  async findOneByExerciseId(exercises: object) {
    try {
      const exercise = await this.exerciseRepo.read(exercises);
      return exercise;
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  //SHOW ALL THE EXERCISES WHICH ARE INDEPENDENT I.E. PROJECT ID IS '1'
  async findAllIndependentExercises(projectId: number) {
    try {
      const exercises = await this.exerciseRepo.readAllExercises({
        projectId: projectId,
      });
      return exercises;
    } catch (e) {
      throw new NotFoundException();
    }
  }

  //UPDATE THE EXERCISE TABLE WITH THE INCOMING EXERCISE-ID AND UPDATED OBJECT
  async updateExercises(
    exerciseId: number,
    updateExerciseDto: UpdateExerciseDto,
    username:string
  ) {
    try {
      updateExerciseDto.modifiedBy=username;
      await this.exerciseRepo.update(exerciseId, updateExerciseDto);
      return new HttpException('UPDATED', HttpStatus.CREATED);
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  //SOFT DELETING I.E. POPULATING A DELETED AT FIELD IN ORDER TO DELETE AN EXERCISE
  async removeOne(id: number) {
    try {
      await this.exerciseRepo.deleteOne(id);
      return new HttpException('DELETED', HttpStatus.GONE);
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  //SHOWING ALL THE EXERCISES BELONGING TO A SPECIFIC PROJECT
  async findExercisesByProjectId(projectId: number) {
    try {
      const exercise = await this.exerciseRepo.read({ projectId: projectId });
      return exercise;
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }
}
