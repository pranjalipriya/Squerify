import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTableColumnDto {
  @IsInt()
  @IsOptional()
  tableId: number;
  @IsNotEmpty()
  columns: IColumn[];
  
  @IsOptional()
  @IsString()
  modifiedBy?:string
}

// export class tableColumn {
//     @IsInt()
//     @IsOptional()
//     tableId: number;
//     @IsNotEmpty()
//     columns: IColumn[];
//     @IsString()
//     @IsNotEmpty()
//     modifiedBy: string;
// }

export interface IColumn {
  fieldName: string;
  datatype: number;
  datatypeSize: number;
  constraints?: number[];
}

export class ColumnUpdate {
  fieldName: string;
  tableId: number;
  datatype: number;
  datatypeSize: number;
  constraints?: number[];
}
