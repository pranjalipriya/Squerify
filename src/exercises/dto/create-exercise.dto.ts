import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateExerciseDto {
  @IsNumber()
  @IsOptional()
  exerciseId?: number;

  @IsString()
  exerciseName: string;

  @IsNumber()
  @IsOptional()
  projectId?: number;

  @IsNumber()
  @IsOptional()
  userId?: number;

  @IsOptional()
  @IsString()
  modifiedBy?:string
}
