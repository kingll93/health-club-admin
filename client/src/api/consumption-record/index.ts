import request from '@/utils/request';
import { ConsumerConsumptionParam, ConsumptionRecordQueryParam, ConsumptionRecordPageResult } from '@/types';
import { AxiosPromise } from 'axios';

export function consumption(data: ConsumerConsumptionParam) {
  return request({
    url: '/consumption-record',
    method: 'post',
    data
  });
}

export function getConsumptionRecordList(data: ConsumptionRecordQueryParam): AxiosPromise<ConsumptionRecordPageResult> {
  return request({
    url: '/consumption-record',
    method: 'get',
    params: data
  });
}
