import { Test, TestingModule } from '@nestjs/testing';
import { ConstraintParameterController } from './constraint-parameter.controller';
import { ConstraintParameterService } from './constraint-parameter.service';

describe('ConstraintParameterController', () => {
  let controller: ConstraintParameterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConstraintParameterController],
      providers: [ConstraintParameterService],
    }).compile();

    controller = module.get<ConstraintParameterController>(
      ConstraintParameterController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
