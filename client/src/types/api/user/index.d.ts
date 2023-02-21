import { PageOrderParam, PageQueryParam, PageResult } from '../base';
import { UserRole, UserStatus } from '@/utils/enums';

/**
 * 用户类型声明
 */
export interface User {
  id: number;
  name: string;
  account: string;
  role: UserRole;
  status: UserStatus;
  createTime: string;
  updateTime: string;
}

/**
 * 用户查询参数类型声明
 */
export interface UserQueryParam extends PageQueryParam, PageOrderParam {
  name?: string;
}

/**
 * 用户分页列表类型声明
 */
export type UserPageResult = PageResult<User[]>;

/**
 * 创建用户参数类型声明
 */
export type CreateUserParam = Pick<User, 'account' | 'name'> & { password: string };

/**
 * 编辑用户参数类型声明
 */
export type UpdateUserParam = Pick<User, 'id'> & Partial<Omit<User, 'id'>> & { password?: string };
