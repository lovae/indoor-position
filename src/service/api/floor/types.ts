/* eslint-disable no-unused-vars */
/*
 * @Author: Zed.wu
 * @Date: 2022-02-14 17:51:11
 * @LastEditors: Zed.Wu
 * @LastEditTime: 2022-02-23 16:36:10
 */

export interface IMapMetadata {
  type: string;
  url: string;
  width: number;
  height: number;
}
export interface IFloor {
  id?: string;
  projectId: string;
  name: string;
  floorLevel: number;
  mapType: number;
  mapId: number;
  mapFloorId: number;
  mapFloorName: string;
  mapMetadata?: IMapMetadata;
  releaseTime?: string;
  createTime?: string;
  updateTime?: string;
  status?: number;
  createdBy?: string;
}

export interface IFloorList {
  list: IFloor[];
}
