import { PartialType } from '@nestjs/swagger';
import { CreateRelationshipParameterDto } from './create-relationship-parameter.dto';

export class UpdateRelationshipParameterDto extends PartialType(CreateRelationshipParameterDto) {}
