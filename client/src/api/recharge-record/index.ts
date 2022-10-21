import request from '@/utils/request';
import { ConsumerRechargeParam, RechargeRecordQueryParam, RechargeRecordPageResult } from '@/types';
import { AxiosPromise } from 'axios';

export function recharge(data: ConsumerRechargeParam) {
  return request({
    url: '/recharge-record',
    method: 'post',
    data
  });
}

export function getRechargeRecordList(data: RechargeRecordQueryParam): AxiosPromise<RechargeRecordPageResult> {
  return request({
    url: '/recharge-record',
    method: 'get',
    params: data
  });
}
