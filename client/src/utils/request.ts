import axios, { AxiosRequestConfig, AxiosResponse, AxiosInstance, Canceler } from 'axios';
import { ElMessage } from 'element-plus';
import { localStorage } from '@/utils/storage';
import useStore from '@/store';
import router from '@/router';

const CancelToken = axios.CancelToken;

// 防止 401 或 403 是并发多余请求
let cancelerList: Canceler[] = [];

// 创建 axios 实例
const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 50000,
  headers: { 'Content-Type': 'application/json;charset=utf-8' },
  cancelToken: new CancelToken(function (c) {
    cancelerList.push(c);
  })
});

// 请求拦截器
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
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
    return response.data;
  },
  error => {
    if (!error.response) {
      return Promise.reject(error);
    }

    const { data, status } = error.response;
    if (status === 401) {
      cancelerList.forEach(cancel => {
        cancel()
      });
      cancelerList = [];
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
