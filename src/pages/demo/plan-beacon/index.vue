<!--
 * @Author: Zed.wu
 * @Date: 2022-01-10 18:25:45
 * @LastEditors: Zed.Wu
 * @LastEditTime: 2022-02-18 15:38:08
-->
<template>
  <div id="map" v-resize="onMapResize">
    <div class="plan-box">
      <div class="steps">信标规划</div>

      <div class="content">
        <!-- <div class="px-2">
          密度：
          <t-radio-group v-model="densityVal" :options="densityOpt"></t-radio-group>
        </div>

        <div class="my-1 px-2">
          <t-tooltip placement="bottom" content="采集历史">
            <t-button theme="default" shape="square" variant="outline">
              <t-icon name="history"></t-icon>
            </t-button>
          </t-tooltip>
          <t-tooltip placement="bottom" content="重新生成" class="mx-3">
            <t-button theme="primary" shape="square" variant="outline" @click="redo">
              <t-icon name="refresh"></t-icon>
            </t-button>
          </t-tooltip>
          <t-tooltip placement="bottom" content="手动编辑">
            <t-button theme="success" shape="square" variant="outline">
              <t-icon name="edit"></t-icon>
            </t-button>
          </t-tooltip>
        </div>-->
        <!-- <t-input-number v-model="spacing"></t-input-number> -->
        <t-form ref="form" :colon="true">
          <t-form-item label="间隔">
            <t-input-number v-model="spacing" placeholder="请输入间隔"></t-input-number>
            <div class="ml-2">米</div>
          </t-form-item>
          <t-form-item label="直线长度"> {{ distance }} 米 </t-form-item>
        </t-form>
        <div class="mt-2 mb-1">
          <t-row justify="space-between">
            <!-- <t-button theme="default">取消</t-button> -->

            <t-button @click="getPoint">生成</t-button>
            <t-button theme="danger" @click="clearPoint">清空</t-button>
            <t-button @click="getPointData">获取实例</t-button>
            <t-button @click="fetchData">完成</t-button>
          </t-row>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref, nextTick, Ref } from 'vue';
import { initMap, convertLngLat, initFloor, lineToPoints, initMarker, aryToPointData, initDraw } from '@/utils/mapUtil';
import { getIndoorMap } from '@/service/api/indoormap';
import request from '@/service/request';

// 间距控制
const spacing: Ref<number> = ref(7);
const distance: Ref<number> = ref(0);

let map;
// 初始化绘制工具
let drawInstance;
function initDrawTool() {
  if (drawInstance) return;
  drawInstance = initDraw(map);
}
/* function drawPoint() {
  // drawInstance.set(points);
  // 绘制完成事件
  map.on('draw.create', (event) => {
    console.info('create', event.features[0]); // 输出绘制后的图形
  });
}

// 获取点位
function savePoints() {
  const p = drawInstance.getAll().features;
  if (p.length) console.log(p);
}

const densityVal = ref('2');
const densityOpt = [
  {
    value: '1',
    label: '高',
  },
  {
    value: '2',
    label: '中',
  },
  {
    value: '3',
    label: '低',
  },
]; */

// 规划点位展示
let pointLayer;
function initPoint() {
  if (pointLayer) return;
  pointLayer = initMarker(map, []);
}
function clearPoint() {
  pointLayer.setData([]);
  drawInstance.deleteAll();
}

// 点图数据
// 转换后
const pointData = [];
const getPoint = () => {
  const res = drawInstance.getAll().features;
  if (!res.length) return;
  // console.log(res);
  // 直接获取最后一个直线
  const {
    id,
    geometry: { type, coordinates },
  } = res[res.length - 1];
  // 必须是直线
  if (type !== 'LineString') return;
  const { dis, ary } = lineToPoints(coordinates[0], coordinates[1]);
  distance.value = dis;
  pointData.push(...aryToPointData(ary));
  drawInstance.set({
    type: 'FeatureCollection',
    features: pointData,
  });
  // pointData.value.push(...aryToData(ary));
  // pointLayer.value.setData(pointData.value);
  drawInstance.delete(id);
};

// 获取现在的数据
// const pointArray = ref([]);
const getPointData = () => {
  const res = drawInstance.getAll().features;
  console.log(drawInstance, res);
  // console.log(JSON.stringify(pointArray.value));
  // const item = [121.6041830654936, 31.179804323209552];
  // const {} = drawInstance.getAll().features;
};

// 楼层平面图
const buildingId = ref('31000005');
const floor = ref('F1');
let floorLayer;
async function loadFloorLayer() {
  if (floorLayer) return;
  const floorGeo = await getIndoorMap(buildingId.value, floor.value);
  const geoData = convertLngLat(floorGeo);
  floorLayer = initFloor(map, geoData, {});
  map.addLayer(floorLayer);
  map.flyTo({
    center: geoData.center,
    zoom: 19,
  });
  // 初始化其他图层
  initDrawTool();
  initPoint();
}

function mapInit() {
  map = initMap(undefined, { center: [121.602699, 31.17583] });
  map.on('load', () => {
    loadFloorLayer();
  });
  map.on('style.load', () => {
    const filter = ['match', ['get', 'id'], 4558283, 'none', 'visible'];
    map.setLayoutProperty('building', 'visibility', filter);
  });
  map.on('click', (e: any) => {
    console.log(e.lngLat.lng, e.lngLat.lat);
  });
  map.on('click', 'building', (e: any) => {
    // console.log(e);
    const { id } = e.features[0];
    console.log(id);
    map.setFilter('building', null);
    /* if (buildingIds.find(i => i === id) !== undefined) {
      map.flyTo({
        center,
        zoom,
        pitch: -90,
        bearing: 0,
      });
    } */
    /* const filter = ["match", id, 4558283, "none", "visible"]
    map.setLayoutProperty('building', 'visibility', filter); */
    const filter = ['match', id, 4558283, '#1B8B8F', 'rgb(70, 66, 150)'];
    map.setPaintProperty('building', 'fill-extrusion-color', filter);
    // 隐藏 building
    // map.setFilter('building','visibility', ['!', ['in', ['get', 'id'], ["literal"].concat(['4558283'])]]);
    const fil = ['all', ['==', ['get', 'id'], 4558283], ['==', ['get', 'building_code'], 4558283]];
    map.setFilter(fil, { layer: 'building' });
    console.log();
  });
}

const fetchData = async () => {
  try {
    // https://indoormap-encrypt.newayz.com/map/indoormaps/v1/31000005/F1.json
    const url = 'https://indoormap-encrypt.newayz.com/map/indoormaps/v1/31000005/F1.json';
    // const url = '/map/indoormaps/v1/31000005/F1.json';
    const res = await request.get(url);
    console.log(res);
  } catch (e) {
    console.log(e);
  } finally {
    // 做一些加载状态初始化等操作
  }
};
// 监听地图容器尺寸，改变地图大小
function onMapResize() {
  map.resize();
}

onMounted(() => {
  console.log('加载完');
  nextTick(() => {
    mapInit();
  });
  console.log(map);
});
</script>

<style lang="less" scoped>
@import url('./index.less');
</style>
