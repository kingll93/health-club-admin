import request from '@/utils/request';
import { Statistic, DailyConsumption } from '@/types';
import { AxiosPromise } from 'axios';

export function getStatistic(): AxiosPromise<Statistic> {
  return request({
    url: '/statistic/base',
    method: 'get'
  });
}

export function getDailyConsumption(): AxiosPromise<DailyConsumption> {
  return request({
    url: '/statistic/daily-consumption',
    method: 'get'
  });
}
