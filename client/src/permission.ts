import router from '@/router';
import { localStorage } from './utils/storage';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
NProgress.configure({ showSpinner: false }); // 进度环显示/隐藏
import useStore from '@/store';

// 白名单路由
const whiteList = ['/login', '/404'];

router.beforeEach(async (to, from, next) => {
  NProgress.start();
  const { user, permission } = useStore();
  const hasToken = localStorage.get('accessToken');
  if (hasToken) {
    if (to.path === '/login') {
      next();
      NProgress.done();
    } else {
      if (user.userInfo) {
        if (to.matched.length === 0) {
          from.name ? next({ name: from.name as any }) : next('/401');
        } else {
          next();
        }
      } else {
        try {
          const userInfo = await user.getUserInfo();
          const permissionRoutes = await permission.generateRoutes(userInfo?.role!);
          router.getRoutes().forEach(route => {
            if (route.name === 'root') {
              router.removeRoute(route.name);
              route.children = [...route.children, ...permissionRoutes];
              router.addRoute(route);
            }
          });
          next({ ...to, replace: true });
        } catch (error) {
          console.log(error);
          // 移除 token 并跳转登录页
          await user.resetToken();
          next(`/login?redirect=${to.path}`);
          NProgress.done();
        }
      }
    }
  } else {
    // 未登录可以访问白名单页面
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      next(`/login?redirect=${to.path}`);
      NProgress.done();
    }
  }
});

router.afterEach(() => {
  NProgress.done();
});
