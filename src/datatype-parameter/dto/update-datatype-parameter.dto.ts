import { PartialType } from '@nestjs/swagger';
import { CreateDatatypeParameterDto } from './create-datatype-parameter.dto';

export class UpdateDatatypeParameterDto extends PartialType(CreateDatatypeParameterDto) {}
