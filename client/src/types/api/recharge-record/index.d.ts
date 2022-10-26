import { PageOrderParam, PageQueryParam, PageResult } from '../base';

/**
 * 充值记录类型声明
 */
export interface RechargeRecord {
  id: number;
  orderNum: string;
  amount: number;
  consumerName: string;
  userName: string;
  createTime: string;
}

/**
 * 充值记录查询参数声明
 */
export interface RechargeRecordQueryParam extends PageQueryParam, PageOrderParam {
  consumerName?: string;
  userName?: string;
  startTime?: string;
  endTime?: string;
}

/**
 * 充值记录分页列表类型声明
 */
 export type RechargeRecordPageResult = PageResult<RechargeRecord[]>;
