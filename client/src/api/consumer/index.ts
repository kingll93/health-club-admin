import request from '@/utils/request';
import { Consumer, ConsumerQueryParam, ConsumerPageResult } from '@/types';
import { AxiosPromise } from 'axios';

export function createConsumer(data: Consumer) {
  return request({
    url: '/consumer',
    method: 'post',
    data
  });
}

export function editConsumer(data: Consumer) {
  return request({
    url: `/consumer/${data.id}`,
    method: 'patch',
    data
  });
}

export function getConsumer(id: number) {
  return request({
    url: `/consumer/${id}`,
    method: 'get',
  });
}

export function getConsumerList(data: ConsumerQueryParam): AxiosPromise<ConsumerPageResult> {
  return request({
    url: '/consumer',
    method: 'get',
    params: data
  });
}

export function deleteConsumer(id: number) {
  return request({
    url: `/consumer/${id}`,
    method: 'delete'
  });
}

