import request from '@/utils/request';
import { Statistic, DailyList, StatisticQueryParam } from '@/types';
import { AxiosPromise } from 'axios';

export function getStatistic(): AxiosPromise<Statistic> {
  return request({
    url: '/statistic/base',
    method: 'get'
  });
}

export function getDailyConsumption(): AxiosPromise<DailyList> {
  return request({
    url: '/statistic/daily-consumption',
    method: 'get'
  });
}

export function getDailyRecharge(): AxiosPromise<DailyList> {
  return request({
    url: '/statistic/daily-recharge',
    method: 'get'
  });
}
