/*
 * @Author: Zed.wu
 * @Date: 2022-02-14 14:51:10
 * @LastEditors: Zed.Wu
 * @LastEditTime: 2022-02-15 15:37:48
 */
import { USER_ID } from '@/config/global';
import { http } from '@/service/request';
import { ILoginData, IUserInfo } from './types';

const base = '/armory/barrack/v1';

const api = {
  login: '/users/login',
  userInfo: '/users',
};

const baseParam = {
  domain: 'wayland',
};

/* export function login(params: T.ILoginApi): Promise<T.IResponse> {
  return request({
    url: base + api.login,
    method: 'post',
    data: { ...baseParam, ...params },
  }).then((res) => res.data);
} */
// 登录
export function login(params): Promise<ILoginData> {
  return http.post<ILoginData>(base + api.login, { ...baseParam, ...params });
}

// 获取用户信息
export function getInfo(): Promise<IUserInfo[]> {
  const userId = localStorage.getItem(USER_ID);
  const url = `${base + api.userInfo}/${Number(userId)}`;
  return http.get<IUserInfo[]>(url, { ...baseParam });
}
