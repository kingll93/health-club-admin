/**
 * 统计结果类型声明
 */
export interface Statistic {
  consumerBalance: string;
  consumptionCount: string;
  consumptionAmount: string;
  rechargeCount: string;
  rechangeAmount: string;
}

/**
 * 每日消费统计类型声明
 */
export type DailyList = Array<{
  sum: number;
  count: number;
  date: string;
}>;

/**
 * 消费类型统计类型声明
 */
export type ConsumptionCategory = Array<{
  type: number,
  value: number
}>;

/**
 * 统计查询参数类型声明
 */
 export interface StatisticQueryParam {
  startTime?: string;
  endTime?: string;
}