import { Test, TestingModule } from '@nestjs/testing';
import { CreateComponentService } from './create_component.service';

describe('CreateComponentService', () => {
  let service: CreateComponentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateComponentService],
    }).compile();

    service = module.get<CreateComponentService>(CreateComponentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
