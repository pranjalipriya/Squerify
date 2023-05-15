import { PartialType } from '@nestjs/mapped-types';
import { CreateTableColumnDto } from './create-table-column.dto';

export class UpdateTableColumnDto extends PartialType(CreateTableColumnDto) {}
