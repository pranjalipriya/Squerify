import { Test, TestingModule } from '@nestjs/testing';
import { TableColumnsController } from './table-columns.controller';
import { TableColumnsService } from './table-columns.service';

describe('TableColumnsController', () => {
  let controller: TableColumnsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TableColumnsController],
      providers: [TableColumnsService],
    }).compile();

    controller = module.get<TableColumnsController>(TableColumnsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
