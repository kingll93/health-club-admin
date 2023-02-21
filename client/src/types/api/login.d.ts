import { UserRole, UserStatus } from '@/utils/enums';

/**
 * 登录表单类型声明
 */
export interface LoginFormData {
  account: string;
  password: string;
}

/**
 * 登录响应类型声明
 */
export interface LoginResponseData {
  access_token: string;
}

/**
 * 用户类型声明
 */
export interface UserInfo {
  account: string;
  name: string;
  role: UserRole;
  status: UserStatus;
}

/**
 * 刷新 token 响应类型声明
 */
export interface RefreshTokenData {
  account_token: string;
}
