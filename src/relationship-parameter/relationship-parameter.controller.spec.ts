import { Test, TestingModule } from '@nestjs/testing';
import { RelationshipParameterController } from './relationship-parameter.controller';
import { RelationshipParameterService } from './relationship-parameter.service';

describe('RelationshipParameterController', () => {
  let controller: RelationshipParameterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RelationshipParameterController],
      providers: [RelationshipParameterService],
    }).compile();

    controller = module.get<RelationshipParameterController>(RelationshipParameterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
