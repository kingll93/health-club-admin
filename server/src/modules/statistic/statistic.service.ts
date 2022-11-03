import { Injectable } from '@nestjs/common';
import { ConsumerService } from '../consumer/consumer.service';
import { ConsumptionRecordService } from '../consumption-record/consumption-record.service';
import { RechargeRecordService } from '../recharge-record/recharge-record.service';

@Injectable()
export class StatisticService {
  constructor(
    private readonly consumerService: ConsumerService,
    private readonly consumptionRecordService: ConsumptionRecordService,
    private readonly rechargeRecordService: RechargeRecordService,
  ) {}

  async getStatistic() {
    const consumerBalance = await this.consumerService.getAllBalance();
    const { count: consumptionCount, amount: consumptionAmount } = await this.consumptionRecordService.getCountAndAmount();
    const { count: rechargeCount, amount: rechangeAmount } = await this.rechargeRecordService.getCountAndAmount();
    return {
      consumerBalance,
      consumptionCount,
      consumptionAmount,
      rechargeCount,
      rechangeAmount
    };
  }
}
