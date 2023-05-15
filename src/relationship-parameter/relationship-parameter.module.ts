import { Module } from '@nestjs/common';
import { RelationshipParameterService } from './relationship-parameter.service';
import { RelationshipParameterController } from './relationship-parameter.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RelationshipParameter } from './entities/relationship-parameter.entity';
import { RelationshipParameterRepository } from './relationship-parameter.repository';

@Module({
  imports: [TypeOrmModule.forFeature([RelationshipParameter])],
  controllers: [RelationshipParameterController],
  providers: [RelationshipParameterService, RelationshipParameterRepository],
})
export class RelationshipParameterModule {}
