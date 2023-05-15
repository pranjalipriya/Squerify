import { Controller } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { DatatypeParameterController } from './datatype-parameter.controller';
import { DatatypeParameterRepository } from './datatype-parameter.repository';
import { DatatypeParameterService } from './datatype-parameter.service';
import { CreateDatatypeParameterDto } from './dto/create-datatype-parameter.dto';

describe('DatatypeParameterController', () => {
  let controller: DatatypeParameterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DatatypeParameterController],
      providers: [DatatypeParameterService, DatatypeParameterRepository],
    }).compile();

    controller = module.get<DatatypeParameterController>
    (DatatypeParameterController);

  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('calling create datatype', () => {
    const dto=new CreateDatatypeParameterDto();
      expect(controller.create(dto)).not.toEqual(null)
    });
});

