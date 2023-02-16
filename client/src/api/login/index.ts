import { LoginFormData, LoginResponseData, RefreshTokenData, UserData, ChangePasswordParam, RegisterFormData } from "@/types";
import request from "@/utils/request";
import { AxiosPromise } from "axios";

/**
 * 登录
 * @param data
 */
export function login(data: LoginFormData): AxiosPromise<LoginResponseData> {
  return request({
    url: "/auth/login",
    method: "post",
    data,
  });
}

/**
 * 刷新token
 * @param token
 */
export function refreshToken(token: string): AxiosPromise<RefreshTokenData> {
  return request({
    url: `/authority/refresh/${token}`,
    method: "post",
  });
}

/**
 * 获取用户详情
 */
 export function getUser(): AxiosPromise<UserData> {
  return request({
    url: "/auth/user",
    method: "get"
  });
}

/**
 * 修改密码
 */
 export function changePassword(data: ChangePasswordParam) {
  return request({
    url: "/user/change-password",
    method: "patch",
    data
  });
}

/**
 * 注册用户
 */
export function register(data: RegisterFormData) {
  return request({
    url: "/user",
    method: "post",
    data
  });
}

/**
 * 注销
 */
export function logout() {
  return request({
    url: "/youlai-auth/oauth/logout",
    method: "delete",
  });
}
