import { Test, TestingModule } from '@nestjs/testing';
import { ConsumptionRecordController } from './consumption-record.controller';
import { ConsumptionRecordService } from './consumption-record.service';

describe('ConsumptionRecordController', () => {
  let controller: ConsumptionRecordController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConsumptionRecordController],
      providers: [ConsumptionRecordService],
    }).compile();

    controller = module.get<ConsumptionRecordController>(ConsumptionRecordController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
