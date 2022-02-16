/* eslint-disable no-unused-vars */
/*
 * @Author: Zed.wu
 * @Date: 2022-02-10 09:55:54
 * @LastEditors: Zed.Wu
 * @LastEditTime: 2022-02-15 17:34:42
 */
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { MessagePlugin } from 'tdesign-vue-next';
import qs from 'qs';
import proxy from '../config/proxy';
import { TOKEN_NAME } from '@/config/global';
import { showMessage } from './status';

const env = import.meta.env.MODE || 'development';

const host = env === 'mock' ? '/' : proxy[env].host; // 如果是mock模式 就不配置host 会走本地Mock拦截

/* const CODE = {
  LOGIN_TIMEOUT: 1000,
  REQUEST_SUCCESS: 0,
  REQUEST_FOBID: 1001,
}; */

const instance = axios.create({
  baseURL: host,
  timeout: 20000,
  // withCredentials: true,
});

const reqMethods = ['get', 'head'];
instance.interceptors.request.use((config: AxiosRequestConfig) => {
  const token = localStorage.getItem(TOKEN_NAME);
  if (token) {
    config.headers[TOKEN_NAME] = `Bearer ${token}`;
  }
  // 数组参数序列化
  if (reqMethods.includes(config.method)) {
    // eslint-disable-next-line func-names
    config.paramsSerializer = function (params) {
      return qs.stringify(params, { arrayFormat: 'repeat' });
    };
  }
  return config;
});

instance.defaults.timeout = 5000;

instance.interceptors.response.use(
  (response: AxiosResponse) => {
    const token = response.headers.authorization;
    if (token) {
      localStorage.setItem(TOKEN_NAME, token);
    }
    if (response.status !== 200) {
      showMessage(response.status);
    }
    return response;
  },
  (err) => {
    // 错误提示
    const { response } = err;
    if (response) {
      const {
        data: { message },
      } = response;
      if (message) {
        MessagePlugin.error(message);
      } else {
        showMessage(response.status);
      }
    } else {
      MessagePlugin.error('网络连接异常，请稍后再试');
    }

    const { config } = err;
    if (!config || !config.retry) return Promise.reject(err);

    config.retryCount = config.retryCount || 0;
    if (config.retryCount >= config.retry) {
      return Promise.reject(err);
    }

    config.retryCount += 1;
    const backoff = new Promise((resolve) => {
      setTimeout(() => {
        resolve(null);
      }, config.retryDelay || 1);
    });

    return backoff.then(() => instance(config));
  },
);

// 封装常用请求
interface Http {
  get<T>(url: string, params?: unknown): Promise<T>;
  post<T>(url: string, params?: unknown): Promise<T>;
  upload<T>(url: string, params: unknown): Promise<T>;
  download(url: string): void;
}
/* interface Http {
  get<T>(url: string, params?: unknown): Promise<IResType<T>>;
  post<T>(url: string, params?: unknown): Promise<IResType<T>>;
  upload<T>(url: string, params: unknown): Promise<IResType<T>>;
  download(url: string): void;
} */

const http: Http = {
  get(url, params) {
    /* return new Promise((resolve, reject) => {
      instance
        .get(url, { params })
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err.data);
        });
    }); */
    return instance({
      url,
      method: 'get',
      params,
    })
      .then((res) => res.data)
      .catch((err) => err.data);
  },
  post(url, data) {
    /* return new Promise((resolve, reject) => {
      instance
        .post(url, JSON.stringify(params))
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err.data);
        });
    }); */
    return instance({
      url,
      method: 'post',
      data,
    })
      .then((res) => res.data)
      .catch((err) => err.data);
  },
  upload(url, data, params = {}) {
    /* return new Promise((resolve, reject) => {
      instance
        .post(url, file, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err.data);
        });
    }); */
    return instance({
      url,
      method: 'post',
      params,
      headers: {
        // 'content-type': 'text/csv'
        'content-type': 'multipart/form-data',
      },
      data,
    })
      .then((res) => res.data)
      .catch((err) => err.data);
  },
  download(url) {
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.src = url;
    // eslint-disable-next-line func-names
    iframe.onload = function () {
      document.body.removeChild(iframe);
    };
    document.body.appendChild(iframe);
  },
};

export default instance;
export { http };
