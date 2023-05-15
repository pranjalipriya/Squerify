import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';
export class CreateTableDto {
  @IsString()
  tableName: string;
  @IsArray()
  @IsOptional()
  columns: [IFields];
  @IsNumber()
  exerciseId: number;
  @IsString()
  @IsOptional()
  modifiedBy: string;
}

export interface IFields {
  fieldName: string;
  datatype: number;
  datatypeSize: number;
  columns?: [IFields];
}
