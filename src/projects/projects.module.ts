import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { Project } from './entities/project.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import ProjectRepository from './projects.repository';
import { ExercisesModule } from '../exercises/exercises.module';
import { forwardRef } from '@nestjs/common/utils/forward-ref.util';
import { TablesModule } from '../tables/tables.module';
import { TablesService } from '../tables/tables.service';
import { TablesRepository } from '../tables/tables.repository';
import { TableColumnsModule } from '../table-columns/table-columns.module';
import { DatatypeParameterModule } from '../datatype-parameter/datatype-parameter.module';
import { ColumnConstraintModule } from '../columnConstraints/columnConstraints.module';
import { ConstraintParameterModule } from '../constraint-parameter/constraint-parameter.module';
import { RelationshipsModule } from '../relationships/relationships.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Project]),
    TablesModule,
    forwardRef(() => ExercisesModule),
    TableColumnsModule,
    DatatypeParameterModule,
    ColumnConstraintModule,
    DatatypeParameterModule,
    ConstraintParameterModule,
    RelationshipsModule
  ],
  controllers: [ProjectsController],
  providers: [
    ProjectsService,
    ProjectRepository,
    TablesService,
    TablesRepository,
  ],
  exports: [ProjectsService, ProjectsModule],
})
export class ProjectsModule {}
