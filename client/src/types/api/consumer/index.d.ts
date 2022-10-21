import { PageOrderParam, PageQueryParam, PageResult } from "../base";

/**
 * 客户类型声明
 */
 export interface Consumer {
  id: number;
  name: string;
  phone: string;
  gender: number;
  balance: number;
  amount: number;
  cardNumber: string;
  cardType: 1 | 2 | 3 | 4; // 1: 8折, 2: 7折, 3: 6折, 4: 5折 
  createTime: Date;
  updateTime: Date;
}

/**
 * 客户查询参数类型声明
 */
export interface ConsumerQueryParam extends PageQueryParam, PageOrderParam {
  name?: number;
  phone?: string;
  gender?: number;
  startTime?: string;
  endTime?: string;
}

/**
 * 客户分页列表类型声明
 */
export type ConsumerPageResult = PageResult<Consumer[]>;


/**
 * 客户充值参数类型声明
 */
 export interface ConsumerRechargeParam {
  consumerId?: Consumer['id'];
  amount?: number
}