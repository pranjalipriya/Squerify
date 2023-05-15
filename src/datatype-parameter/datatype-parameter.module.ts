import { Module } from '@nestjs/common';
import { DatatypeParameterService } from './datatype-parameter.service';
import { DatatypeParameterController } from './datatype-parameter.controller';
import { DatatypeParameterRepository } from './datatype-parameter.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatatypeParameter } from './entities/datatype-parameter.entity';

@Module({
  imports:[TypeOrmModule.forFeature([DatatypeParameter])],
  controllers: [DatatypeParameterController],
  providers: [DatatypeParameterService , DatatypeParameterRepository],
  exports:[DatatypeParameterService,DatatypeParameterRepository]
})
export class DatatypeParameterModule {}
