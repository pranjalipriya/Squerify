import { PartialType } from '@nestjs/swagger';
import { CreateConstraintParameterDto } from './create-constraint-parameter.dto';

export class UpdateConstraintParameterDto extends PartialType(CreateConstraintParameterDto) {}
