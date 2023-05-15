import {  Controller} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ConstraintsService } from './columnConstraints.service';
@ApiTags('Constraints')
@ApiBearerAuth('JWT-auth')
@Controller('constraints')
export class ConstraintsController {
  constructor(private readonly constraintsService: ConstraintsService) {}
}