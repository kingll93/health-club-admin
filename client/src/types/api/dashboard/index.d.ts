import { ConsumptionType } from '@/utils/enums';

/**
 * 统计结果类型声明
 */
export interface Statistic {
  guestConsumption: number;
  memberConsumption: number;
  memberRechange: number;
  balance: number;
}

/**
 * 当日统计结果类型声明
 */
export interface TodayStatistic {
  guestConsumption: number;
  memberConsumption: number;
  memberRechange: number;
}

/**
 * 每日消费统计类型声明
 */
export type DailyList = Array<{
  guestConsumption: number;
  memberConsumption: number;
  date: string;
}>;

/**
 * 每日充值统计类型声明
 */
export type DailyRechargeList = Array<{
  amount: number;
  date: string;
}>;

/**
 * 消费类型统计类型声明
 */
export type ConsumptionCategory = Array<{
  type: ConsumptionType;
  count: number;
  amount: number;
}>;

/**
 * 统计查询参数类型声明
 */
export interface StatisticQueryParam {
  startTime?: string;
  endTime?: string;
}
