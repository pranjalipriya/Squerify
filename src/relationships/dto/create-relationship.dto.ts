import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateRelationshipDto {
  @IsNumber()
  sourceTableId: number;

  @IsNumber()
  targetTableId: number;

  @IsNumber()
  relationshipType: number;

  @IsString()
  targetColumnName: string;

  @IsOptional()
  @IsString()
  modifiedBy?:string
}
