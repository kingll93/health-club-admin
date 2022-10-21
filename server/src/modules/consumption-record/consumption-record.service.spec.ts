import { Test, TestingModule } from '@nestjs/testing';
import { ConsumptionRecordService } from './consumption-record.service';

describe('ConsumptionRecordService', () => {
  let service: ConsumptionRecordService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConsumptionRecordService],
    }).compile();

    service = module.get<ConsumptionRecordService>(ConsumptionRecordService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
