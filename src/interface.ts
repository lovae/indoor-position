/*
 * @Author: Zed.wu
 * @Date: 2022-02-10 09:55:54
 * @LastEditors: Zed.Wu
 * @LastEditTime: 2022-02-23 16:32:56
 */
import STYLE_CONFIG from '@/config/style';

export interface ResDataType<T = any> {
  code: number;
  data: T;
}

export interface MenuRoute {
  path: string;
  title?: string;
  icon?:
    | string
    | {
        render: () => void;
      };
  redirect?: string;
  children: MenuRoute[];
  meta: any;
}

export type ModeType = 'dark' | 'light';

export type SettingType = typeof STYLE_CONFIG;

export type ClassName = { [className: string]: any } | ClassName[] | string;

export type CommonObjType = {
  [key: string]: string | number;
};

export interface NotificationItem {
  id: string;
  content: string;
  type: string;
  status: boolean;
  collected: boolean;
  date: string;
  quality: 'high' | 'low' | 'middle';
}
interface Geometry {
  type: string;
  coordinates: number[][][];
}

interface Properties2 {
  id: string;
  // eslint-disable-next-line camelcase
  mall_id: string;
  name: string;
  type: string;
  color: string;
  height: number;
}

export interface Feature {
  type: string;
  properties: Properties2;
  geometry: Geometry;
}

interface Properties {
  name: string;
}

interface Crs {
  type: string;
  properties: Properties;
}

export interface GeoJson {
  type: string;
  name: string;
  crs: Crs;
  features: Feature[];
}
