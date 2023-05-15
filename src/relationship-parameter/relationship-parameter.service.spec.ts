import { Test, TestingModule } from '@nestjs/testing';
import { RelationshipParameterService } from './relationship-parameter.service';

describe('RelationshipParameterService', () => {
  let service: RelationshipParameterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RelationshipParameterService],
    }).compile();

    service = module.get<RelationshipParameterService>(RelationshipParameterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
