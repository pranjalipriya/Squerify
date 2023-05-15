import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common/decorators';
import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common/exceptions';
import { forwardRef } from '@nestjs/common/utils/forward-ref.util';
import { ExercisesService } from '../exercises/exercises.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import ProjectRepository from './projects.repository';
import { TablesService } from '../tables/tables.service';
import {
  createDatabaseOrExercise,
  createTable,
  createSchema,
  alter
} from 'ddl-sql-query-generator';
import { TableColumnsService } from '../table-columns/table-columns.service';
import { DatatypeParameterService } from '../datatype-parameter/datatype-parameter.service';
import { ConstraintParameterService } from '../constraint-parameter/constraint-parameter.service';
import { RelationshipsService } from '../relationships/relationships.service';

@Injectable()
export class ProjectsService {
  constructor(
    private projectRepo: ProjectRepository,
    @Inject(forwardRef(() => ExercisesService))
    private exercisesService: ExercisesService,
    private tableService: TablesService,
    private tableColumnService: TableColumnsService,
    private dataTypeParameterService: DatatypeParameterService,
    private constraintParameterService: ConstraintParameterService,
    private relationshipService: RelationshipsService

  ) {}

  //CREATE PROJECT WITH CREATE-PROJECT OBJECT AS REQUEST
  async createProject(createProjectDto: CreateProjectDto, userId: number) {
    try {
      createProjectDto.userId = userId;
      await this.projectRepo.create(createProjectDto);
      return new HttpException('PROJECT CREATED', HttpStatus.CREATED);
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  //EXPORT PROJECT/INDEPENDENT EXERCISE AS SQL QUERIES
  async exportProject(projectId: number, userId : number , exerciseId?: number ) {
    try {
      const query = [];
      const alterQuery = [];
      const tableArr = [];
      let entity = '';
      const defaultProject = await this.projectRepo.read({userId : userId});
      if (projectId !== defaultProject[0].id && !exerciseId) {
        const project = await this.projectRepo.read({ id: projectId });
        entity = project[0].projectName;
        query.push(createDatabaseOrExercise(project[0].projectName));
        const exercises = await this.exercisesService.findExercisesByProjectId(
          projectId
        );
        if (exercises.length) {
          for (let index = 0; index < exercises.length; index++) {
            query.push(createSchema(exercises[index].exerciseName));
            const tables = await this.tableService.findAll(exercises[index].id);
            for (let tableIndex = 0 ; tableIndex < tables.length ; tableIndex++) {
              const tableColumns: any =
                await this.tableColumnService.getColumnsByTableId(
                  tables[tableIndex].id,
                );
              for (let tableColumnIndex = 0 ; tableColumnIndex < tableColumns.length ; tableColumnIndex++) 
              {
                const datatype = await this.dataTypeParameterService.findOne(
                  tableColumns[tableColumnIndex].datatype,
                );
                tableArr.push({
                  fieldName: tableColumns[tableColumnIndex].fieldName,
                  datatype: datatype.name,
                });
                const constraintsArr = [];
                for (let colConstraintIndex = 0 ; colConstraintIndex < tableColumns[tableColumnIndex].constraints.length ; colConstraintIndex++) 
                {
                  const constraint =
                    await this.constraintParameterService.findOne(
                      tableColumns[tableColumnIndex].constraints[
                        colConstraintIndex
                      ].constraintParameterId,
                    );

                  if (constraint) {
                    constraintsArr.push(constraint.name);
                  }
                }
                const columns = tableArr.map((value, i) => ({
                  ...value,
                  ...{ constraints: constraintsArr },
                }));

                query.push(
                  await createTable(tables[tableIndex].tableName, columns),
                );
                const tableRelationshipsExistFromSource = await this.relationshipService.findRelationshipsBySourceTableId(tables[tableIndex].id)
                if(tableRelationshipsExistFromSource){
                  const sourceTable = await this.tableService.findOne(tableRelationshipsExistFromSource.sourceTableId);
                  const targetTable = await this.tableService.findOne(tableRelationshipsExistFromSource.targetTableId);
                  if(sourceTable && targetTable){
                    //one to many --> this is hard-coded, has to be changed later
                    if(tableRelationshipsExistFromSource.relationshipType === 2){
                      const fields = {
                        constraint : "FOREIGN KEY",
                        target : tableRelationshipsExistFromSource.targetColumnName,
                        sourceTable : targetTable.tableName,
                        source : 'id'
                      }
                      alterQuery.push(await alter(sourceTable.tableName , fields , 'ADD' , true))
                    }
                    //one to one -->
                    else if(tableRelationshipsExistFromSource.relationshipType === 3){
                      const fields = {
                        constraint : "UNIQUE FOREIGN KEY",
                        target : tableRelationshipsExistFromSource.targetColumnName,
                        sourceTable : targetTable.tableName,
                        source : 'id'
                      }
                      alterQuery.push(await alter(sourceTable.tableName , fields , 'ADD' , true))
                    }
                    //many to many -->
                    else if(tableRelationshipsExistFromSource.relationshipType === 1){
                      alterQuery.push(`CREATE TABLE ${sourceTable.tableName}${targetTable.tableName}Relation (${sourceTable.tableName}ID INT(15) NOT NULL, ${targetTable.tableName}ID INT(15) NOT NULL FOREIGN KEY (${sourceTable.tableName}ID) REFERENCES ${sourceTable.tableName}(id), FOREIGN KEY (${targetTable.tableName}ID) REFERENCES ${targetTable.tableName}(id))`);
                    }
                  }
                }
              }
            }
          }
        }
      } else if (projectId === defaultProject[0].id && exerciseId) {
        const exercise = await this.exercisesService.findOneByExerciseId({
          id: exerciseId,
          projectId: projectId,
        });
        if (exercise) {
          entity = exercise[0].exerciseName;
          query.push(createDatabaseOrExercise(exercise[0].exerciseName));
          const tables = await this.tableService.findAll(exercise[0].id);
          for (let tableIndex = 0; tableIndex < tables.length; tableIndex++) {
            const tableColumns: any =
              await this.tableColumnService.getColumnsByTableId(
                tables[tableIndex].id,
              );
            for (let tableColumnIndex = 0 ; tableColumnIndex < tableColumns.length ; tableColumnIndex++) 
            {
              const datatype = await this.dataTypeParameterService.findOne(
                tableColumns[tableColumnIndex].datatype,
              );
              tableArr.push({
                fieldName: tableColumns[tableColumnIndex].fieldName,
                datatype: datatype.name,
              });
              const constraintsArr = [];
              for (let colConstraintIndex = 0 ; colConstraintIndex < tableColumns[tableColumnIndex].constraints.length ; colConstraintIndex++) 
                {
                const constraint =
                  await this.constraintParameterService.findOne(
                    tableColumns[tableColumnIndex].constraints[
                      colConstraintIndex
                    ].constraintParameterId,
                  );

                if (constraint) {
                  constraintsArr.push(constraint.name);
                }
              }
              const columns = tableArr.map((value, i) => ({
                ...value,
                ...{ constraints: constraintsArr },
              }));
              query.push(
                await createTable(tables[tableIndex].tableName, columns),
              );

              const tableRelationshipsExistFromSource = await this.relationshipService.findRelationshipsBySourceTableId(tables[tableIndex].id)
                if(tableRelationshipsExistFromSource){
                  const sourceTable = await this.tableService.findOne(tableRelationshipsExistFromSource.sourceTableId);
                  const targetTable = await this.tableService.findOne(tableRelationshipsExistFromSource.targetTableId);
                  if(sourceTable && targetTable){
                    //one to many --> this is hard-coded, has to be changed later
                    if(tableRelationshipsExistFromSource.relationshipType === 2){
                      const fields = {
                        constraint : "FOREIGN KEY",
                        target : tableRelationshipsExistFromSource.targetColumnName,
                        sourceTable : targetTable.tableName,
                        source : 'id'
                      }
                      alterQuery.push(await alter(sourceTable.tableName , fields , 'ADD' , true))
                    }
                    //one to one --> 
                    else if(tableRelationshipsExistFromSource.relationshipType === 3){
                      const fields = {
                        constraint : "UNIQUE FOREIGN KEY",
                        target : tableRelationshipsExistFromSource.targetColumnName,
                        sourceTable : targetTable.tableName,
                        source : 'id'
                      }
                      alterQuery.push(await alter(sourceTable.tableName , fields , 'ADD' , true))
                    }
                    //many to many --> 
                    else if(tableRelationshipsExistFromSource.relationshipType === 1){
                      alterQuery.push(`CREATE TABLE ${sourceTable.tableName}${targetTable.tableName}Relation (${sourceTable.tableName}ID INT(15) NOT NULL, ${targetTable.tableName}ID INT(15) NOT NULL FOREIGN KEY (${sourceTable.tableName}ID) REFERENCES ${sourceTable.tableName}(id), FOREIGN KEY (${targetTable.tableName}ID) REFERENCES ${targetTable.tableName}(id))`);
                    }
                  }
                }
            }
          }
        }
      } else if (projectId !== defaultProject[0].id && exerciseId) {
        const exercise = await this.exercisesService.findOneByExerciseId({
          id: exerciseId,
          projectId: projectId,
        });
        const project = await this.projectRepo.read({ id: projectId });
        if (project && exercise) {
          entity = exercise[0].exerciseName;
          query.push(createDatabaseOrExercise(exercise[0].exerciseName));
          const tables = await this.tableService.findAll(exercise[0].id);
          for (let tableIndex = 0; tableIndex < tables.length; tableIndex++) {
            const tableColumns: any =
              await this.tableColumnService.getColumnsByTableId(
                tables[tableIndex].id,
              );
            for (
              let tableColumnIndex = 0 ; tableColumnIndex < tableColumns.length ; tableColumnIndex++) 
              {
              const datatype = await this.dataTypeParameterService.findOne(
                tableColumns[tableColumnIndex].datatype
              );
              tableArr.push({
                fieldName: tableColumns[tableColumnIndex].fieldName,
                datatype: datatype.name,
              });
              const constraintsArr = [];
              for (
                let colConstraintIndex = 0;
                colConstraintIndex <
                tableColumns[tableColumnIndex].constraints.length;
                colConstraintIndex++
              ) {
                const constraint =
                  await this.constraintParameterService.findOne(
                    tableColumns[tableColumnIndex].constraints[
                      colConstraintIndex
                    ].constraintParameterId,
                  );

                if (constraint) {
                  constraintsArr.push(constraint.name);
                }
              }
              const columns = tableArr.map((value) => ({
                ...value,
                ...{ constraints: constraintsArr },
              }));
              query.push(
                await createTable(tables[tableIndex].tableName, columns),
              );
               
              const tableRelationshipsExistFromSource = await this.relationshipService.findRelationshipsBySourceTableId(tables[tableIndex].id)
              if(tableRelationshipsExistFromSource){
                const sourceTable = await this.tableService.findOne(tableRelationshipsExistFromSource.sourceTableId);
                const targetTable = await this.tableService.findOne(tableRelationshipsExistFromSource.targetTableId);
                if(sourceTable && targetTable){
                  //one to many --> this is hard-coded, has to be changed later
                  if(tableRelationshipsExistFromSource.relationshipType === 2){
                    const fields = {
                      constraint : "FOREIGN KEY",
                      target : tableRelationshipsExistFromSource.targetColumnName,
                      sourceTable : targetTable.tableName,
                      source : 'id'
                    }
                    alterQuery.push(await alter(sourceTable.tableName , fields , 'ADD' , true))
                  }
                  //one to one --> 
                  else if(tableRelationshipsExistFromSource.relationshipType === 3){
                    const fields = {
                      constraint : "UNIQUE FOREIGN KEY",
                      target : tableRelationshipsExistFromSource.targetColumnName,
                      sourceTable : targetTable.tableName,
                      source : 'id'
                    }
                    alterQuery.push(await alter(sourceTable.tableName , fields , 'ADD' , true))
                  }
                  //many to many --> 
                  else if(tableRelationshipsExistFromSource.relationshipType === 1){
                    alterQuery.push(`CREATE TABLE ${sourceTable.tableName}${targetTable.tableName}Relation (${sourceTable.tableName}ID INT(15) NOT NULL, ${targetTable.tableName}ID INT(15) NOT NULL FOREIGN KEY (${sourceTable.tableName}ID) REFERENCES ${sourceTable.tableName}(id), FOREIGN KEY (${targetTable.tableName}ID) REFERENCES ${targetTable.tableName}(id))`);
                  }
                }
              }
            }
          }
        }
      }

      return { query: query.concat(alterQuery), entityName: entity };
    } catch (e) {
      throw new NotFoundException();
    }
  }

  //FIND ALL PROJECTS BELONGING TO A USER USING USER-ID
  async findProjectsByUserId(userId: number) {
    try {
      const projects = await this.projectRepo.read({ userId: userId });
      return projects;
    } catch (e) {
      throw new NotFoundException();
    }
  }

  //FIND ALL PROJECTS AND INDEPENDENT EXERCISES BELONGING TO A USER
  async findProjectAndExercises(userId: number) {
    try {
      const projects = await this.projectRepo.readAllProjects(userId);
      const defaultProject = await this.projectRepo.read({userId : userId});
      const exercises = await this.exercisesService.findAllIndependentExercises(
        defaultProject[0].id,
      );
      return [...projects, ...exercises];
    } catch (e) {
      throw new NotFoundException();
    }
  }

  //GET THE PROJECT WHICH HAS IT'S PROJECT NAME AS 'DEFAULT'
  async getDefault(userId: number) {
    try {
      return await this.projectRepo.read({userId : userId});
    } catch (e) {
      throw new NotFoundException();
    }
  }

  //UPDATE EXISTING PROJECTS WITH IT'S PROJECT-ID AND UPDATED PROJECT REQUEST OBJECT
  async updateProjects(projectId: number, updateProjectDto: UpdateProjectDto, updatedBy: string) {
    try {
      updateProjectDto.modifiedBy = updatedBy;
      await this.projectRepo.update(projectId, updateProjectDto);
      return new HttpException('PROJECT UPDATED', HttpStatus.ACCEPTED);
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  //SOFT-DELETE A PROJECT WITH IT'S PROJECT ID I.E A DELETED-AT FIELD IS POPULATED
  async removeOne(id: number) {
    try {
      await this.projectRepo.deleteOne(id);
      return new HttpException('PROJECT DELETED', HttpStatus.GONE);
    } catch (e) {
      throw new NotFoundException();
    }
  }
}
