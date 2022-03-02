/* eslint-disable no-unused-vars */
/*
 * @Author: Zed.wu
 * @Date: 2022-02-14 17:51:11
 * @LastEditors: Zed.Wu
 * @LastEditTime: 2022-02-23 16:36:10
 */

export interface IProjectOld {
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
export interface IProject {
  id: string;
  name: string;
  description: string;
  province: string;
  city: string;
  address: string;
  surveyors: string;
  auditors: string;
  needBeacon: number;
  beaconType: number;
  technology: number;
  releaseTime: string;
  createTime: string;
  updateTime: string;
  status: number;
  createdBy: string;
}
export interface IProjectList {
  list: IProjectOld[];
}
