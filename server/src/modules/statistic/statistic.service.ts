import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { ConsumerService } from '../consumer/consumer.service';
import { ConsumptionRecordService } from '../consumption-record/consumption-record.service';
import { RechargeRecordService } from '../recharge-record/recharge-record.service';
import { StatisticDto } from './dto/statistic.dto';
import * as dayjs from 'dayjs';

@Injectable()
export class StatisticService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly consumerService: ConsumerService,
    private readonly consumptionRecordService: ConsumptionRecordService,
    private readonly rechargeRecordService: RechargeRecordService,
  ) {}

  async getStatistic() {
    const consumerBalance = await this.consumerService.getAllBalance();
    const { count: consumptionCount, amount: consumptionAmount } =
      await this.consumptionRecordService.getCountAndAmount();
    const { count: rechargeCount, amount: rechangeAmount } =
      await this.rechargeRecordService.getCountAndAmount();
    return {
      consumerBalance,
      consumptionCount,
      consumptionAmount,
      rechargeCount,
      rechangeAmount,
    };
  }

  async dailyConsumption() {
    return await this.dataSource.query(`
      select
        sum(amount) sum,
        count(1) count,
        date_format(create_time, '%Y-%m-%d') date
      from consumption_record
      group by date
      order by date ASC
    `);
  }

  async dailyRecharge() {
    return await this.dataSource.query(`
      select
        sum(amount) sum,
        count(1) count,
        date_format(create_time, '%Y-%m-%d') date
      from recharge_record
      where remark != '余额充值'
      group by date
      order by date ASC
    `);
  }

  async consumptionCategory(dto: StatisticDto) {
    // return await this.dataSource.query(`
    //   select
    //     date_format( create_time, '%Y-%m-%d' ) date,
    //     sum(case when consumption_type = 1 then 1 else 0 end) hairCare,
    //     sum(case when consumption_type = 2 then 1 else 0 end) hairDye,
    //     sum(case when consumption_type = 9 then 1 else 0 end) other
    //   from
    //     consumption_record
    //   group by date
    // `);
    const { startTime='', endTime=dayjs().format('YYYY-MM-DD HH:mm:ss') } = dto;
    const result = await this.dataSource.query(`
      select
        count(*) value,
        consumption_type type
      from
        consumption_record
      where create_time between '${startTime}' and '${endTime}'
      group by consumption_type
    `);
    return result;
  }
}
