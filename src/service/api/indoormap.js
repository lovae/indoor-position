/*
 * @Author: Zed.wu
 * @Date: 2022-02-09 17:23:59
 * @LastEditors: Zed.Wu
 * @LastEditTime: 2022-02-09 17:39:07
 */
import geojson from './1F.json';

export function getIndoorMap(buildingId, floor) {
  console.log(buildingId, floor);
  return geojson;
}
