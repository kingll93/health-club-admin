import { RouteRecordRaw, RouteLocationNormalized } from 'vue-router';
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
}
/**
 * 用户状态类型声明
 */
export interface UserState {
  token: string;
  username: string;
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
 export interface MenuState {
  topMenus: RouteRecordRaw[]; // 顶部菜单
  activeTopMenu: RouteRecordRaw; // 激活的顶部菜单
}
