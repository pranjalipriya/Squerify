import { IsString } from 'class-validator';

export class CreateDatatypeParameterDto {
  @IsString()
  name: string;
}
