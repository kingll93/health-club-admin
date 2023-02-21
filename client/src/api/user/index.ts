import request from '@/utils/request';
import { User, UserQueryParam, UserPageResult, CreateUserParam, UpdateUserParam } from '@/types';
import { AxiosPromise } from 'axios';

export function createUser(data: CreateUserParam) {
  return request({
    url: '/user',
    method: 'post',
    data
  });
}

export function getUser(id: number): AxiosPromise<User> {
    return request({
      url: `/user/${id}`,
      method: 'get'
    });
}

export function getUserList(data: UserQueryParam): AxiosPromise<UserPageResult> {
  return request({
    url: '/user',
    method: 'get',
    params: data
  });
}

export function updateUser(data: UpdateUserParam): AxiosPromise<User> {
  return request({
    url: `/user/${data.id}`,
    method: 'patch',
    data
  });
}

/**
 * 登录用户修改自己密码
 */
export function changePassword(password: string) {
  return request({
    url: '/user/change-password',
    method: 'patch',
    data: {
      password
    }
  });
}
