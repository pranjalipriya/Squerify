import { IsString } from 'class-validator';

export class CreateRelationshipParameterDto {
  @IsString()
  name: string;
}
