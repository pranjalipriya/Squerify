import { Test, TestingModule } from '@nestjs/testing';
import { DatatypeParameterRepository } from './datatype-parameter.repository';
import { DatatypeParameterService } from './datatype-parameter.service';

describe('DatatypeParameterService', () => {
  let service: DatatypeParameterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DatatypeParameterService, DatatypeParameterRepository],
    }).compile();

    service = module.get<DatatypeParameterService>(DatatypeParameterService);
  });

  it('should be defined', () => {
    expect(service.create).toBeDefined();
  });
});
