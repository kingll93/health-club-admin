import router from "@/router";
import { localStorage } from "./utils/storage";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
NProgress.configure({ showSpinner: false }); // 进度环显示/隐藏

// 白名单路由
const whiteList = ["/login", "/404"];

router.beforeEach(async (to, from, next) => {
  NProgress.start();
  const hasToken = localStorage.get("accessToken");
  if (hasToken) {
    next();
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
