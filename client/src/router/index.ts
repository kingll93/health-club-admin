// src/router/index.ts
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import { UserRole } from '@/utils/enums';

export const Layout = () => import('@/layout/index.vue');

// 静态路由
export const constantRoutes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404.vue')
  },
  {
    name: 'root',
    path: '/',
    redirect: '/consumer',
    component: Layout,
    children: [
      {
        path: '401',
        component: () => import('@/views/error-page/401.vue'),
        meta: { hidden: true }
      }
    ]
  }
];

// 业务路由
export const businessRoutes: Array<RouteRecordRaw> = [
  {
    name:'dashboard',
    path: 'dashboard',
    component: () => import('@/views/dashboard/index.vue'),
    meta: {
      title: '数据看板',
      icon: 'dashboard'
    }
  },
  {
    name: 'consumer',
    path: 'consumer',
    component: () => import('@/views/consumer/index.vue'),
    meta: {
      title: '客户列表',
      icon: 'consumer'
    }
  },
  {
    name: 'consumer-add',
    path: 'consumer-add',
    component: () => import('@/views/consumer/edit.vue'),
    meta: {
      title: '新增客户',
      hidden: true,
      activeMenu: '/consumer'
    }
  },
  {
    name: 'consumer-edit',
    path: 'consumer-edit',
    component: () => import('@/views/consumer/edit.vue'),
    meta: {
      title: '编辑客户',
      hidden: true,
      activeMenu: '/consumer'
    }
  },
  {
    name: 'recharge-record',
    path: 'recharge-record',
    component: () => import('@/views/recharge-record/index.vue'),
    meta: {
      title: '充值记录',
      icon: 'money'
    }
  },
  {
    name: 'consumption-record',
    path: 'consumption-record',
    component: () => import('@/views/consumption-record/index.vue'),
    meta: {
      title: '消费记录',
      icon: 'money'
    }
  },
  {
    name: 'user',
    path: 'user',
    component: () => import('@/views/user/index.vue'),
    meta: {
      title: '用户管理',
      icon: 'user',
      roles: [UserRole.ADMIN]
    }
  },
  {
    name: 'user-add',
    path: 'user-add',
    component: () => import('@/views/user/add.vue'),
    meta: {
      title: '新增用户',
      hidden: true,
      activeMenu: '/user',
      roles: [UserRole.ADMIN]
    }
  }
];

// 重置路由
export function resetRouter() {
  router.getRoutes().forEach(route => {
    if (route.name === 'root') {
      router.removeRoute(route.name);
      router.addRoute(constantRoutes.find(route => route.name === 'root')!)
    }
  })
}

// 创建路由实例
const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes as RouteRecordRaw[],
  // 刷新时，滚动条位置还原
  scrollBehavior: () => ({ left: 0, top: 0 })
});

export default router;
