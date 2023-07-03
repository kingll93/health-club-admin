import request from '@/utils/request';
import { Statistic, TodayStatistic, DailyList, DailyRechargeList, ConsumptionCategory, StatisticQueryParam } from '@/types';
import { AxiosPromise } from 'axios';

export function getStatistic(): AxiosPromise<Statistic> {
  return request({
    url: '/statistic/base',
    method: 'get'
  });
}

export function getTodayStatistic(): AxiosPromise<TodayStatistic> {
  return request({
    url: '/statistic/today',
    method: 'get'
  });
}

export function getDailyConsumption(): AxiosPromise<DailyList> {
  return request({
    url: '/statistic/daily-consumption',
    method: 'get'
  });
}

export function getDailyRecharge(): AxiosPromise<DailyRechargeList> {
  return request({
    url: '/statistic/daily-recharge',
    method: 'get'
  });
}

export function getConsumptionCategory(params: StatisticQueryParam): AxiosPromise<ConsumptionCategory> {
  return request({
    url: '/statistic/consumption-category',
    method: 'get',
    params
  });
}
