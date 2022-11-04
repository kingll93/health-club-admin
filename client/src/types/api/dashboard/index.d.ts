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
 export type DailyConsumption = Array<{
  sum: number;
  count: number;
  date: string;
 }>
