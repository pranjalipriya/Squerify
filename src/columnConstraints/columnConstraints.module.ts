import { Module } from '@nestjs/common';
import { ConstraintsService } from './columnConstraints.service';
import { ConstraintsController } from './columnConstraints.controller';
import { ConstraintRepository } from './columnConstraints.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColumnConstraint } from './entities/columnConstraint.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ColumnConstraint])],
  controllers: [ConstraintsController],
  providers: [ConstraintsService, ConstraintRepository],
  exports: [ConstraintsService, ConstraintRepository],
})
export class ColumnConstraintModule {}
