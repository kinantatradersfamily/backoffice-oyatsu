import { Test, TestingModule } from '@nestjs/testing';
import { CreateComponentController } from './create_component.controller';

describe('CreateComponentController', () => {
  let controller: CreateComponentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreateComponentController],
    }).compile();

    controller = module.get<CreateComponentController>(CreateComponentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
