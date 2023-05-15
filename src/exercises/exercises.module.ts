import { Module } from '@nestjs/common';
import { ExercisesService } from './exercises.service';
import { ExercisesController } from './exercises.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Exercise } from './entities/exercise.entity';
import { ExerciseRepository } from './exercises.repository';
import { ProjectsModule } from '../projects/projects.module';
import { forwardRef } from '@nestjs/common/utils/forward-ref.util';
import { TablesModule } from '../tables/tables.module';
import { TableColumnsModule } from '../table-columns/table-columns.module';
import { ColumnConstraintModule } from '../columnConstraints/columnConstraints.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Exercise]),
    forwardRef(() => ProjectsModule),
    TablesModule,
    TableColumnsModule,
    ColumnConstraintModule,
  ],
  exports: [ExercisesService],
  controllers: [ExercisesController],
  providers: [ExercisesService, ExerciseRepository],
})
export class ExercisesModule {}
