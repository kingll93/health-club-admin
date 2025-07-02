import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { StatisticDto } from './dto/statistic.dto';
import * as dayjs from 'dayjs';
import { CardType, IsDeleted } from 'src/core/enums/common.enum';
import { Consumer } from '../consumer/entities/consumer.entity';

@Injectable()
export class StatisticService {
  constructor(private readonly dataSource: DataSource) {}

  async getStatistic() {
    const { guestConsumption, memberConsumption } = (
      await this.dataSource.query(`
      select 
        sum(case when card_type = ${CardType.GUEST} then cr.amount else 0 end) guestConsumption,
        sum(case when card_type = ${CardType.MEMBER} then cr.amount else 0 end) memberConsumption
      from consumption_record cr
      left join consumers c on c.id = cr.consumer_id
      where cr.is_deleted = ${IsDeleted.NO}
    `)
    )[0];
    const { memberRechange } = (
      await this.dataSource.query(`
      select 
        sum(rr.amount) memberRechange
      from recharge_record rr
      left join consumers c on c.id = rr.consumer_id
      where c.card_type = ${CardType.MEMBER} and rr.is_deleted = ${IsDeleted.NO}
    `)
    )[0];
    const { balance } = await this.dataSource
      .createQueryBuilder()
      .select('sum(balance)', 'balance')
      .from(Consumer, 'consumers')
      .where('consumers.card_type != :type', { type: CardType.GUEST })
      .andWhere('consumers.is_deleted = :isDeleted', {
        isDeleted: IsDeleted.NO,
      })
      .getRawOne();
    return {
      guestConsumption,
      memberConsumption,
      memberRechange,
      balance,
    };
  }

  async getTodayStatistic() {
    const today = dayjs().format('YYYY-MM-DD');

    const startTime = `${today} 00:00:00`;
    const endTime = `${today} 23:59:59`;

    const { guestConsumption, memberConsumption } = (
      await this.dataSource.query(`
      select 
        sum(case when card_type = ${CardType.GUEST} then cr.amount else 0 end) guestConsumption,
        sum(case when card_type = ${CardType.MEMBER} then cr.amount else 0 end) memberConsumption
      from consumption_record cr
      left join consumers c on c.id = cr.consumer_id
      where cr.create_time between '${startTime}' and '${endTime}' and cr.is_deleted = ${IsDeleted.NO}
    `)
    )[0];

    const { memberRechange } = (
      await this.dataSource.query(`
      select 
        sum(rr.amount) memberRechange
      from recharge_record rr
      left join consumers c on c.id = rr.consumer_id
      where c.card_type = ${CardType.MEMBER} and rr.create_time between '${startTime}' and '${endTime}' and rr.is_deleted = ${IsDeleted.NO}
    `)
    )[0];

    return {
      guestConsumption: guestConsumption || 0,
      memberConsumption: memberConsumption || 0,
      memberRechange: memberRechange || 0,
    };
  }

  async dailyConsumption() {
    const dateRange = (
      await this.dataSource.query(`
        select 
          min(date_format(create_time, '%Y-%m-%d')) min,
          max(date_format(create_time, '%Y-%m-%d')) max
        from consumption_record
      `)
    )[0];
    const dateList = getDateList(dateRange.min, dateRange.max);
    const dateMap = dateList.reduce((res, date) => {
      res[date] = {
        guestConsumption: 0,
        memberConsumption: 0,
      };
      return res;
    }, {});
    const result = await this.dataSource.query(`
      select
        date_format(cr.create_time, '%Y-%m-%d') date,
        sum(case when c.card_type = ${CardType.GUEST} then cr.amount else 0 end) guestConsumption,
        sum(case when c.card_type = ${CardType.MEMBER} then cr.amount else 0 end) memberConsumption
      from consumption_record cr
      left join consumers c on c.id = cr.consumer_id
      where cr.is_deleted = ${IsDeleted.NO}
      group by date
      order by date ASC
    `);

    result.forEach((item) => {
      dateMap[item.date] = {
        guestConsumption: item.guestConsumption,
        memberConsumption: item.memberConsumption,
      };
    });

    return Object.keys(dateMap).map((date) => ({
      date,
      ...dateMap[date],
    }));
  }

  async dailyRecharge() {
    const dateRange = (
      await this.dataSource.query(`
        select 
          min(date_format(create_time, '%Y-%m-%d')) min,
          max(date_format(create_time, '%Y-%m-%d')) max
        from recharge_record
      `)
    )[0];

    const dateList = getDateList(dateRange.min, dateRange.max);
    const dateMap = dateList.reduce((res, date) => {
      res[date] = 0;
      return res;
    }, {});

    const result = await this.dataSource.query(`
      select
        sum(rr.amount) amount,
        date_format(rr.create_time, '%Y-%m-%d') date
      from recharge_record rr
      left join consumers c on c.id = rr.consumer_id
      where c.card_type = ${CardType.MEMBER} and rr.remark != '余额充值' and rr.is_deleted = ${IsDeleted.NO}
      group by date
      order by date ASC
    `);

    result.forEach((item) => (dateMap[item.date] = item.amount));

    return Object.keys(dateMap).map((date) => ({
      date,
      amount: dateMap[date],
    }));
  }

  async consumptionCategory(dto: StatisticDto) {
    const { startTime = '', endTime = dayjs().format('YYYY-MM-DD') } = dto;
    const result = await this.dataSource.query(`
      select
        count(*) count,
        sum(amount) amount,
        consumption_type type
      from
        consumption_record
      where create_time between '${startTime} 00:00:00' and '${endTime} 23:59:59' and is_deleted = ${IsDeleted.NO}
      group by consumption_type
    `);
    return result;
  }
}

function getDateList(begin: string, end: string): string[] {
  const dateLength = dayjs(end).diff(begin, 'day') + 1;
  const startDay = dayjs(begin);
  const result: string[] = [];
  for (let i = 0; i < dateLength; i++) {
    result.push(startDay.add(i, 'day').format('YYYY-MM-DD'));
  }
  return result;
}
