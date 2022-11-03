import request from '@/utils/request';
import { Statistic } from '@/types';
import { AxiosPromise } from 'axios';

export function getStatistic(): AxiosPromise<Statistic> {
  return request({
    url: '/statistic/base',
    method: 'get'
  });
}
