import { Test, TestingModule } from '@nestjs/testing';
import { ConstraintsController } from './columnConstraints.controller';
import { ConstraintsService } from './columnConstraints.service';

describe('ConstraintsController', () => {
  let controller: ConstraintsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConstraintsController],
      providers: [ConstraintsService],
    }).compile();

    controller = module.get<ConstraintsController>(ConstraintsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
