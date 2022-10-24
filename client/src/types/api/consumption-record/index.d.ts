import { PageOrderParam, PageQueryParam, PageResult } from '../base';
import { ConsumptionType, HairType } from '@/utils/enums';

/**
 * 充值记录类型声明
 */
export interface ConsumptionRecord {
  id: number;
  consumptionType: ConsumptionType,
  hairType: HairType,
  amount: number;
  consumerName: string;
  userName: string;
  createTime: string;
}

/**
 * 充值记录查询参数声明
 */
export interface ConsumptionRecordQueryParam extends PageQueryParam, PageOrderParam {
  consumerName?: string;
  userName?: string;
  startTime?: string;
  endTime?: string;
}

/**
 * 充值记录分页列表类型声明
 */
 export type ConsumptionRecordPageResult = PageResult<ConsumptionRecord[]>;
