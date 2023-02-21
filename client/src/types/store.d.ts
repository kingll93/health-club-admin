import { RouteRecordRaw } from 'vue-router';
import { UserInfo } from './api/login';
import { TodayStatistic } from './api/dashboard';
/**
 * App类型声明
 */
export interface AppState {
  device: string;
  sidebar: {
    opened: boolean;
    withoutAnimation: boolean;
  };
  size: string;
  todayStatistic: TodayStatistic;
}
/**
 * 用户状态类型声明
 */
export interface UserState {
  token: string;
  userInfo: UserInfo | null;
}

/**
 * 设置状态类型声明
 */
export interface SettingState {
  theme: string;
  showSettings: boolean;
  fixedHeader: boolean;
  sidebarLogo: boolean;
}

/**
 * 菜单状态类型声明
 */
 export interface PermissionState {
  routes: RouteRecordRaw[];
}
