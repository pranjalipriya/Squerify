import { Test, TestingModule } from '@nestjs/testing';
import { ConstraintParameterService } from './constraint-parameter.service';

describe('ConstraintParameterService', () => {
  let service: ConstraintParameterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConstraintParameterService],
    }).compile();

    service = module.get<ConstraintParameterService>(ConstraintParameterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
