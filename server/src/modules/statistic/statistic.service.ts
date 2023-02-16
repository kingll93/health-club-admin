import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { StatisticDto } from './dto/statistic.dto';
import * as dayjs from 'dayjs';
import { CardType, IsDeleted } from 'src/core/enums/common.enum';
import { Consumer } from '../consumer/entities/consumer.entity';

@Injectable()
export class StatisticService {
  constructor(
    private readonly dataSource: DataSource
  ) {}

  async getStatistic() {
    const { guestConsumption, memberConsumption } = (await this.dataSource.query(`
      select 
        sum(case when card_type = ${CardType.GUEST} then cr.amount else 0 end) guestConsumption,
        sum(case when card_type = ${CardType.MEMBER} then cr.amount else 0 end) memberConsumption
      from consumption_record cr
      left join consumers c on c.id = cr.consumer_id
      where cr.is_deleted = ${IsDeleted.NO}
    `))[0];
    const { memberRechange } = (await this.dataSource.query(`
      select 
        sum(rr.amount) memberRechange
      from recharge_record rr
      left join consumers c on c.id = rr.consumer_id
      where c.card_type = ${CardType.MEMBER} and rr.is_deleted = ${IsDeleted.NO}
    `))[0];
    const { balance } = await this.dataSource.createQueryBuilder()
    .select('sum(balance)', 'balance')
    .from(Consumer, 'consumers')
    .where('consumers.card_type != :type', {type: CardType.GUEST}).andWhere('consumers.is_deleted = :isDeleted', {isDeleted: IsDeleted.NO})
    .getRawOne();
    return {
      guestConsumption,
      memberConsumption,
      memberRechange,
      balance
    }
  }

  async getTodayStatistic() {
    const today = dayjs().format('YYYY-MM-DD')
    const { guestConsumption, memberConsumption } = (await this.dataSource.query(`
      select 
        sum(case when card_type = ${CardType.GUEST} then cr.amount else 0 end) guestConsumption,
        sum(case when card_type = ${CardType.MEMBER} then cr.amount else 0 end) memberConsumption
      from consumption_record cr
      left join consumers c on c.id = cr.consumer_id
      where cr.create_time between '${today + ' 00:00:00'}' and '${today + ' 23:59:59'}'
    `))[0];
    const { memberRechange } = (await this.dataSource.query(`
      select 
        sum(rr.amount) memberRechange
      from recharge_record rr
      left join consumers c on c.id = rr.consumer_id
      where c.card_type = ${CardType.MEMBER} and rr.create_time between '${today + ' 00:00:00'}' and '${today + ' 23:59:59'}'
    `))[0];
    return {
      guestConsumption: guestConsumption || 0,
      memberConsumption: memberConsumption || 0,
      memberRechange: memberRechange || 0
    }
  }

  async dailyConsumption() {
    return await this.dataSource.query(`
      select
        date_format(cr.create_time, '%Y-%m-%d') date,
        sum(case when c.card_type = ${CardType.GUEST} then cr.amount else 0 end) guestConsumption,
        sum(case when c.card_type = ${CardType.MEMBER} then cr.amount else 0 end) memberConsumption
      from consumption_record cr
      left join consumers c on c.id = cr.consumer_id
      group by date
      order by date ASC
    `);
  }

  async dailyRecharge() {
    return await this.dataSource.query(`
      select
        sum(rr.amount) amount,
        date_format(rr.create_time, '%Y-%m-%d') date
      from recharge_record rr
      left join consumers c on c.id = rr.consumer_id
      where c.card_type = ${CardType.MEMBER} and rr.remark != '余额充值'
      group by date
      order by date ASC
    `);
  }

  async consumptionCategory(dto: StatisticDto) {
    const { startTime = '', endTime = dayjs().format('YYYY-MM-DD HH:mm:ss') } =
      dto;
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
