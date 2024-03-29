import axios, { AxiosRequestConfig, AxiosResponse, CancelTokenSource, Canceler } from 'axios';
import { ElMessage } from 'element-plus';
import { localStorage } from '@/utils/storage';
import useStore from '@/store';
import router from '@/router';

let cancelTokenSource: CancelTokenSource = axios.CancelToken.source();
function cancel() {
  cancelTokenSource.cancel();
  cancelTokenSource = axios.CancelToken.source();
}

// 创建 axios 实例
const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 50000,
  headers: { 'Content-Type': 'application/json;charset=utf-8' }
});

// 请求拦截器
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    config.cancelToken = cancelTokenSource.token;
    if (!config.headers) {
      throw new Error(`Expected 'config' and 'config.headers' not to be undefined`);
    }
    const { user } = useStore();
    if (user.token) {
      config.headers.Authorization = localStorage.get('accessToken');
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    response.data = response.data.data;
    return response;
  },
  error => {
    if (!error.response) {
      return Promise.reject(error);
    }

    const { data, status } = error.response;
    if (status === 401) {
      cancel();
      ElMessage({
        message: '用户验证失败，请重新登录',
        type: 'error'
      });
      router.push('/login');
    } else {
      ElMessage({
        message: data.message || '系统出错',
        type: 'error'
      });
    }
    return Promise.reject(new Error(data.message || 'Error'));
  }
);

// 导出 axios 实例
export default service;
