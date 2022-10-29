import { Test, TestingModule } from '@nestjs/testing';
import { RechargeRecordController } from './recharge-record.controller';
import { RechargeRecordService } from './recharge-record.service';

describe('RechargeRecordController', () => {
  let controller: RechargeRecordController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RechargeRecordController],
      providers: [RechargeRecordService],
    }).compile();

    controller = module.get<RechargeRecordController>(RechargeRecordController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
