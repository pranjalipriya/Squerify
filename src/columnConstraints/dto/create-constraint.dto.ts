import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateConstraintDto {
  @IsNumber()
  constraintParameterId: number;
  @IsNumber()
  columnId: number;
  @IsNumber()
  tableId: number;

  @IsOptional()
  @IsString()
  modifiedBy?:string
}

export interface IConstraint {
  tableId: number;
  fieldName: string;
  datatype: number;
  constraints?: number[];
  id: number;
}
