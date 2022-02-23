/* eslint-disable no-unused-vars */
/*
 * @Author: Zed.wu
 * @Date: 2022-02-14 17:51:11
 * @LastEditors: Zed.Wu
 * @LastEditTime: 2022-02-23 16:36:10
 */

export interface IProject {
  index: number;
  status: number;
  no: string;
  name: string;
  paymentType: number;
  contractType: number;
  updateTime: string;
  amount: string;
  adminName: string;
}

export interface IProjectList {
  list: IProject[];
}
