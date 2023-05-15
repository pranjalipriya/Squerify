import { Module } from '@nestjs/common';
import { RelationshipsService } from './relationships.service';
import { RelationshipsController } from './relationships.controller';
import { RelationshipsRepository } from './relationships.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Relationship } from './entities/relationship.entity';
import { TableColumnsModule } from '../table-columns/table-columns.module';

@Module({
  imports: [TypeOrmModule.forFeature([Relationship]) , TableColumnsModule],
  controllers: [RelationshipsController],
  providers: [RelationshipsService, RelationshipsRepository],
  exports : [RelationshipsService, RelationshipsRepository]
})
export class RelationshipsModule {}
