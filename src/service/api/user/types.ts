/* eslint-disable no-unused-vars */
/*
 * @Author: Zed.wu
 * @Date: 2022-02-14 17:51:11
 * @LastEditors: Zed.Wu
 * @LastEditTime: 2022-02-15 15:37:16
 */
export interface ILoginData {
  token: string;
  userId: string;
  userName: string;
}

export interface ILoginApi {
  login: (params) => Promise<any>;
}

interface Role {
  id: string;
  name: string;
  code: string;
}

export interface IUserInfo {
  id: number;
  name: string;
  domain: string;
  createTime: string;
  updateTime: string;
  loginType: string;
  role: Role;
  state: string;
}
