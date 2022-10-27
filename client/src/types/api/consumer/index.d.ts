import { PageOrderParam, PageQueryParam, PageResult } from "../base";
import { Gender, ConsumptionType, HairType } from "@/utils/enums";

/**
 * 客户类型声明
 */
 export interface Consumer {
  id: number;
  name: string;
  phone: string;
  gender: Gender;
  balance: number;
  amount: number;
  cardNumber: string;
  createTime: string;
  updateTime: string;
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
  amount?: number;
  remark?: string;
}

/**
 * 客户消费参数类型声明
 */
 export interface ConsumerConsumptionParam {
  consumerId?: Consumer['id'];
  consumptionType: ConsumptionType;
  hairType: HairType;
  amount?: number;
  remark?: string;
}