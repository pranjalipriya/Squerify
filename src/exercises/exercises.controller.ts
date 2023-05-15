import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { ExercisesService } from './exercises.service';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';
@ApiTags('Exercises')
@ApiBearerAuth('JWT-auth')
@Controller('exercises')
export class ExercisesController {
  constructor(private readonly exercisesService: ExercisesService) {}

  //POST REQUEST --> TO CREATE A NEW EXERCISE WITH USER-ID IN PARAMS AND EXERCISE OBJECT AS REQUEST BODY
  @Post()
  async create(
    @Body() createExerciseDto: CreateExerciseDto,
    @Req() req: Request,
  ) {
    try {
      const token = req.headers.authorization;
      const slicedToken = token.split(' ').slice(1).join('');
      const payload = jwt.decode(slicedToken);
      const response = await this.exercisesService.createExercise(
        createExerciseDto,
        payload['userid'],
      );
      return response;
    } catch (e) {
      throw e;
    }
  }

  //GET METHOD --> FINDING ALL THE EXERCISES BELONGING UNDER A PROJECT ID (PARAMS).
  @Get('/exercises-project/:projectId')
  async findOneByExerciseId(@Param('projectId') projectId: string) {
    try {
      const response = await this.exercisesService.findExercisesByProjectId(
        +projectId,
      );
      return response;
    } catch (e) {
      throw e;
    }
  }

  //PATCH METHOD --> UPDATING THE EXERCISE ENTITY WITH THE EXERCISE ID FROM PARAMS AND THE UPDATED
  //REQUEST OBJECT FROM BODY
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateExerciseDto: UpdateExerciseDto,
    @Req() req: Request
  ) {
    try {

      const token = req.headers.authorization;
      const slicedToken = token.split(' ').slice(1).join('');
      const payload = jwt.decode(slicedToken);
      const username=payload['username']
      const response = await this.exercisesService.updateExercises(
        +id,
        updateExerciseDto,
        username
      );
      return response;
    } catch (e) {
      throw e;
    }
  }

  //DELETE METHOD --> DELETING THE EXERCISE UNDER THE EXERCISE-ID PASSED BY THE PARAMS
  @Delete(':id')
  async removeOne(@Param('id') id: string) {
    try {
      const response = await this.exercisesService.removeOne(+id);
      return response;
    } catch (e) {
      throw e;
    }
  }
}
