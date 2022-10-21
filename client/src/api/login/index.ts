import { LoginFormData, LoginResponseData, RefreshTokenData } from "@/types";
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
 * 注销
 */
export function logout() {
  return request({
    url: "/youlai-auth/oauth/logout",
    method: "delete",
  });
}
