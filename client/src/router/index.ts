// src/router/index.ts
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

export const Layout = () => import('@/layout/index.vue');
export const SubMenu = () => import('@/components/SubMenu/index.vue');

// 静态路由
export const constantRoutes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    meta: { hidden: true }
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404.vue'),
    meta: { hidden: true }
  },
  {
    path: '/',
    component: Layout,
    redirect: '/consumer',
    children: [
      {
        path: 'consumer',
        component: () => import('@/views/consumer/index.vue'),
        meta: {
          title: '客户列表',
          icon: 'consumer'
        }
      },
      {
        path: 'consumer-add',
        component: () => import('@/views/consumer/edit.vue'),
        meta: {
          title: '新增客户',
          hidden: true,
          activeMenu: '/consumer'
        }
      },
      {
        path: 'consumer-edit',
        component: () => import('@/views/consumer/edit.vue'),
        meta: {
          title: '编辑客户',
          hidden: true,
          activeMenu: '/consumer'
        }
      },
      {
        path: 'recharge-record',
        component: () => import('@/views/recharge-record/index.vue'),
        meta: {
          title: '充值记录',
          icon: 'money'
        }
      },
      {
        path: 'consumption-record',
        component: () => import('@/views/consumption-record/index.vue'),
        meta: {
          title: '消费记录',
          icon: 'money'
        }
      },
      // {
      //   path: 'test',
      //   component: () => import('@/views/test/index.vue'),
      //   meta: {
      //     title: 'test',
      //     icon: 'money'
      //   }
      // },
    ]
  }
];

// 创建路由实例
const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes as RouteRecordRaw[],
  // 刷新时，滚动条位置还原
  scrollBehavior: () => ({ left: 0, top: 0 })
});

export default router;
