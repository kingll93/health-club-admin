import { UserType, UserStatus } from '@/utils/enums';

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
 export interface UserData {
  account: string;
  name: string;
  role: UserType;
  status: UserStatus;
}

/**
 * 修改密码参数类型声明
 */
 export interface ChangePasswordParam {
  password: string
}

/**
 * 创建用户参数类型声明
 */
export interface RegisterFormData {
  account: string;
  name: string;
  password: string;
}


/**
 * 刷新 token 响应类型声明
 */
 export interface RefreshTokenData {
  account_token: string;
}
