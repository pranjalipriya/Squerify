import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProjectDto {
  @IsNumber()
  @IsOptional()
  projectId?: number;

  @IsString()
  projectName: string;

  @IsNumber()
  @IsOptional()
  userId?: number;

  @IsOptional()
  @IsString()
  modifiedBy?:string
}
