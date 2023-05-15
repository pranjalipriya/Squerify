import { Module } from '@nestjs/common';
import { TableColumnsService } from './table-columns.service';
import { TableColumnsController } from './table-columns.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TableColumn } from './entities/table-column.entity';
import { TableColumnRepository } from './table-columns.repository';
import { ColumnConstraintModule } from '../columnConstraints/columnConstraints.module';

@Module({
  imports: [TypeOrmModule.forFeature([TableColumn]), ColumnConstraintModule],
  controllers: [TableColumnsController],
  providers: [TableColumnsService, TableColumnRepository],
  exports: [TableColumnsService, TableColumnRepository],
})
export class TableColumnsModule {}
