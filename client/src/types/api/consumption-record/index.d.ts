import { PageOrderParam, PageQueryParam, PageResult } from '../base';
import { ConsumptionType, HairType } from '@/utils/enums';

/**
 * 消费记录类型声明
 */
export interface ConsumptionRecord {
  id: number;
  orderNum: string,
  consumptionType: ConsumptionType,
  hairType: HairType,
  amount: number;
  consumerName: string;
  userName: string;
  createTime: string;
}

/**
 * 消费记录查询参数声明
 */
export interface ConsumptionRecordQueryParam extends PageQueryParam, PageOrderParam {
  consumerName?: string;
  userName?: string;
  startTime?: string;
  endTime?: string;
}

/**
 * 消费记录分页列表类型声明
 */
 export type ConsumptionRecordPageResult = PageResult<ConsumptionRecord[]>;
