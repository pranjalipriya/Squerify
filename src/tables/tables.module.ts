import { Module } from '@nestjs/common';
import { TablesService } from './tables.service';
import { TablesController } from './tables.controller';
import { TablesRepository } from './tables.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tables } from './entities/table.entity';
import { TableColumnsService } from '../table-columns/table-columns.service';
import { TableColumnsModule } from '../table-columns/table-columns.module';
import { ColumnConstraintModule } from '../columnConstraints/columnConstraints.module';
import { DatatypeParameterModule } from '../datatype-parameter/datatype-parameter.module';
import { DatatypeParameterService } from '../datatype-parameter/datatype-parameter.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Tables]),
    TableColumnsModule,
    ColumnConstraintModule,
    DatatypeParameterModule,
  ],
  controllers: [TablesController],
  providers: [
    TablesService,
    TablesRepository,
    TableColumnsService,
    DatatypeParameterService,
  ],
  exports: [TablesRepository, TablesService],
})
export class TablesModule {}
