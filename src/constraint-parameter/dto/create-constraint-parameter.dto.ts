import { IsString } from 'class-validator';

export class CreateConstraintParameterDto {
  @IsString()
  name: string;
}
