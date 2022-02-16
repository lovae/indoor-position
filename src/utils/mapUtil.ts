/* eslint-disable no-underscore-dangle */
/*
 * @Author: Zed.wu
 * @Date: 2022-01-10 18:26:05
 * @LastEditors: Zed.Wu
 * @LastEditTime: 2022-02-16 15:24:44
 */
import { cloneDeep } from 'lodash';
import { GeoJson } from '@/interface';

const aimap = window.global?.aimap;
aimap.accessToken = '5hlKj1icxbxXCoLZ1QwWmO2OyGOjhmCC';
aimap.baseApiUrl = 'https://location-dev.newayz.com';

// eslint-disable-next-line default-param-last
export function initMap(container = 'map', config?) {
  const mapOpt = {
    container,
    style: 'aimap://styles/aimap/darkblue-v4',
    localIdeographFontFamily: "'Microsoft YaHei', 'sans-serif'",
    // center: [121.499718, 31.239703],
    center: [121.604297, 31.179749],
    zoom: 15,
    minZoom: 6,
    maxDuration: 1000,
    ...config,
  };
  const map = new aimap.Map(mapOpt);
  map.on('loadcomplete', () => {
    const layers = map.style._layers;
    const reg = /^entity_*/;
    for (const layer in layers) {
      // console.log(layer, layers[layer])
      // 隐藏建筑物
      // if (layers[layer].type === 'symbol') {
      //   this.map.setLayoutProperty(layer, 'visibility', 'none')
      // }
      if (reg.test(layer)) {
        // console.log(layer, layers[layer])
        // 隐藏POI的圆点图片（不包括文字）
        map.setLayoutProperty(layer, 'icon-image', '');
      }
    }
  });
  return map;
}

export function convertLngLat(geo: GeoJson) {
  const data = cloneDeep(geo);
  let center;
  let { features } = data;
  features = features.map((i) => {
    const {
      geometry: { coordinates },
    } = i;
    if (!coordinates) return;
    coordinates[0] = coordinates[0].map((l) => {
      const lng = l[0] / 1.31 - 1.21;
      const lat = l[1] / 1.51 - 1.41;
      if (!center) {
        center = [lng, lat];
      }
      return [lng, lat];
    });
    // eslint-disable-next-line consistent-return
    return i;
  });
  return { ...data, features, center };
}
// 绘制楼层
export function initFloor(map, data, style) {
  const polygon = new aimap.Polygon({
    data,
    style: {
      'fill-color': [
        'match',
        'name',
        ['公共区域', '#7cb305'],
        ['中空区域', 'rgba(0,0,0,0.1)'],
        ['非开放区域', 'black'],
        ['楼梯', '#fff'],
        ['楼梯间1', '#fff'],
        ['楼梯间2', '#fff'],
        ['客梯', '#fff'],
        ['货梯', '#fff'],
        '#7f8c8d',
      ],
      'fill-opacity': 0.5,
      'line-color': '#fff',
      'line-opacity': 0.8,
      'line-width': 3,
      'text-field': ['get', 'name'],
      'text-size': 12,
      'text-color': '#13c2c2',
      ...style,
    },
    map,
  });
  return polygon;
}

// 按数据长度计算时长
const countDuration = (length: number) => {
  if (length <= 0) return 2;
  let weight;
  if (length < 10) {
    weight = 2;
  } else if (length < 30) {
    weight = 3;
  } else if (length < 100) {
    weight = 4;
  } else if (length < 500) {
    weight = 5;
  } else if (length < 1000) {
    weight = 6;
  } else {
    weight = 7;
  }
  return Math.max(Number((length / weight).toFixed(1)), 2);
};

export function initTrack(map, coordinates, styles = {}, spatialReference = 'gcj02', length = 0) {
  // const color = '#1890ff'
  const duration = countDuration(length);
  console.log(duration, countDuration(1000));
  return new aimap.TrackLayer({
    dataType: 'geojson',
    map,
    data: {
      coordinates,
    },
    animation: {
      repeat: true,
      duration,
      autoplay: false,
    },
    spatialReference,
    minZoom: 3,
    maxZoom: 23,
    style: {
      'line-color': '#09e5ff',
      'line-width': 3,
      trackPoint: {
        'circle-color': '#1890ff',
        'circle-radius': 6,
      },
      start: {
        'circle-color': '#2eee71',
        'circle-radius': 6,
        'text-field': '起点',
        'text-size': 12,
        'text-color': '#000',
        'text-anchor': 'right',
      },
      end: {
        'circle-color': '#ee4c3c',
        'circle-radius': 6,
        'text-field': '终点',
        'text-size': 12,
        'text-color': '#000',
        'text-anchor': 'left',
      },
      ...styles,
    },
  });
}
