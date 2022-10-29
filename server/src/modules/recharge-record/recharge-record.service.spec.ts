import { Test, TestingModule } from '@nestjs/testing';
import { RechargeRecordService } from './recharge-record.service';

describe('RechargeRecordService', () => {
  let service: RechargeRecordService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RechargeRecordService],
    }).compile();

    service = module.get<RechargeRecordService>(RechargeRecordService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
