/*
 * @Author: Zed.wu
 * @Date: 2022-02-10 09:55:54
 * @LastEditors: Zed.Wu
 * @LastEditTime: 2022-02-11 10:37:28
 */
import axios from 'axios';
import { MessagePlugin } from 'tdesign-vue-next';
import proxy from '../config/proxy';

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

instance.interceptors.request.use((config) => config);

instance.defaults.timeout = 5000;

instance.interceptors.response.use(
  (response) => {
    if (response.status === 200) {
      const { data } = response;
      /* if (data.code === CODE.REQUEST_SUCCESS) {
        return data;
      } */
      return data;
    }
    return response;
  },
  (err) => {
    /* const {response}=err
    if(response){
      const {data,status}=response
      if(status === 403){

      }
    } */
    MessagePlugin.error(`请求错误${err}`);

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

export default instance;
