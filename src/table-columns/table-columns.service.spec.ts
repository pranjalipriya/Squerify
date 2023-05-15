import { Test, TestingModule } from '@nestjs/testing';
import { TableColumnsService } from './table-columns.service';

describe('TableColumnsService', () => {
  let service: TableColumnsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TableColumnsService],
    }).compile();

    service = module.get<TableColumnsService>(TableColumnsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
