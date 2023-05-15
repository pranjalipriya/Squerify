/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UtilityModule } from './utility/utility.module';
import { ExercisesModule } from './exercises/exercises.module';
import { TablesModule } from './tables/tables.module';
import { ProjectsModule } from './projects/projects.module';
import { UsersModule } from './users/users.module';
import { ColumnConstraintModule } from './columnConstraints/columnConstraints.module';
import { RelationshipsModule } from './relationships/relationships.module';
import { TableColumnsModule } from './table-columns/table-columns.module';
import { RelationshipParameterModule } from './relationship-parameter/relationship-parameter.module';
import { AuthModule } from './auth/auth.module';
import { ConnectionModule } from './connection/connection.module';
import { ConstraintParameterModule } from './constraint-parameter/constraint-parameter.module';
import { DatatypeParameterModule } from './datatype-parameter/datatype-parameter.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UtilityModule,
    ExercisesModule,
    TablesModule,
    UsersModule,
    ProjectsModule,
    ColumnConstraintModule,
    RelationshipsModule,
    AuthModule,
    TableColumnsModule,
    RelationshipParameterModule,
    ConnectionModule,
    ConstraintParameterModule,
    DatatypeParameterModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
