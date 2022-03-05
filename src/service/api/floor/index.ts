/*
 * @Author: Zed.wu
 * @Date: 2022-02-14 14:51:10
 * @LastEditors: Zed.Wu
 * @LastEditTime: 2022-02-23 16:36:23
 */
import { http } from '@/service/request';
import { ResDataType } from '@/interface';
import { IFloorList } from './types';

const base = 'https://service-bv448zsw-1257786608.gz.apigw.tencentcs.com';

const api = {
  list: '/api/get-list',
};

/* const baseParam = {
  domain: 'wayland',
}; */

/* export function login(params: T.ILoginApi): Promise<T.IResponse> {
  return request({
    url: base + api.login,
    method: 'post',
    data: { ...baseParam, ...params },
  }).then((res) => res.data);
} */

// 获取列表
export function getList(): Promise<ResDataType<IFloorList>> {
  const url = base + api.list;
  return http.get<ResDataType<IFloorList>>(url);
}
