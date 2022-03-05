/* eslint-disable no-unused-vars */
/*
 * @Author: Zed.wu
 * @Date: 2022-02-14 17:51:11
 * @LastEditors: Zed.Wu
 * @LastEditTime: 2022-02-23 16:36:10
 */

export interface IInternalFloor {
  id: string;
  name: string;
  altitude: number;
  index: number;
}

export interface IInternalMap {
  id: string;
  parent_id: string;
  name: string;
  district_id: string;
  city_id: string;
  city_name: string;
  has_aoi: string;
  address: string;
  center: string[];
  bounds: string[];
  floors: IInternalFloor[];
}

export interface IInternalMapList {
  count: number;
  malls: IInternalMap[];
}
