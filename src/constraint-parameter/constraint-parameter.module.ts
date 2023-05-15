import { Module } from '@nestjs/common';
import { ConstraintParameterService } from './constraint-parameter.service';
import { ConstraintParameterController } from './constraint-parameter.controller';
import { ConstraintParameterRepository } from './constraint-parameter.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConstraintParameter } from './entities/constraint-parameter.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ConstraintParameter])],
  controllers: [ConstraintParameterController],
  providers: [ConstraintParameterService, ConstraintParameterRepository],
  exports: [ConstraintParameterService, ConstraintParameterRepository],
})
export class ConstraintParameterModule {}
