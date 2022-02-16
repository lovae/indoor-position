<!--
 * @Author: Zed.wu
 * @Date: 2022-01-10 18:25:45
 * @LastEditors: Zed.Wu
 * @LastEditTime: 2022-02-16 11:08:15
-->
<template>
  <div class="map-wrapper">
    <div id="map"></div>

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

        <div class="mt-2 mb-1">
          <t-row justify="space-between">
            <t-button theme="default">取消</t-button>

            <t-button @click="getDraw">获取</t-button>
            <t-button @click="pushData">推送</t-button>
            <t-button @click="fetchData">完成</t-button>
          </t-row>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { initMap, convertLngLat, initFloor } from '@/utils/mapUtil';
import { getIndoorMap } from '@/service/api/indoormap';
import request from '@/service/request';

const aimap = window.global?.aimap;

const map = ref(null);

// 在地图上新增一个点
let drawInstance;
function initDraw() {
  if (drawInstance) return;
  // 初始化绘制工具
  drawInstance = new aimap.Draw({
    displayControlsDefault: true,
    controls: {
      point: true, // 显示标记点控件
      polygon: false, // 显示多边形控件
      line_string: true, // 显示标记线控件
      circle: false, // 显示标记圆控件
      rectangle: false, // 显示标记矩形控件
    },
  });
  // 添加工具到地图
  map.value.addControl(drawInstance);
}
/* function drawPoint() {
  // drawInstance.set(points);
  // 绘制完成事件
  map.value.on('draw.create', (event) => {
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

const buildingId = ref('31000005');
const floor = ref('F1');
const floorLayer = ref(null);
async function loadFloorLayer() {
  if (floorLayer.value !== null) return;
  const floorGeo = await getIndoorMap(buildingId.value, floor.value);
  const geoData = convertLngLat(floorGeo);
  floorLayer.value = initFloor(map.value, geoData, {});
  map.value.addLayer(floorLayer.value);
  map.value.flyTo({
    center: geoData.center,
    zoom: 19,
  });
  initDraw();
}

function mapInit() {
  map.value = initMap(undefined, { center: [121.602699, 31.17583] });
  map.value.on('load', () => {
    loadFloorLayer();
  });
  map.value.on('style.load', () => {
    const filter = ['match', ['get', 'id'], 4558283, 'none', 'visible'];
    map.value.setLayoutProperty('building', 'visibility', filter);
  });
  map.value.on('click', (e: any) => {
    console.log(e.lngLat.lng, e.lngLat.lat);
  });
  map.value.on('click', 'building', (e: any) => {
    // console.log(e);
    const { id } = e.features[0];
    console.log(id);
    map.value.setFilter('building', null);
    /* if (buildingIds.find(i => i === id) !== undefined) {
      map.flyTo({
        center,
        zoom,
        pitch: -90,
        bearing: 0,
      });
    } */
    /* const filter = ["match", id, 4558283, "none", "visible"]
    map.value.setLayoutProperty('building', 'visibility', filter); */
    const filter = ['match', id, 4558283, '#1B8B8F', 'rgb(70, 66, 150)'];
    map.value.setPaintProperty('building', 'fill-extrusion-color', filter);
    // 隐藏 building
    // map.value.setFilter('building','visibility', ['!', ['in', ['get', 'id'], ["literal"].concat(['4558283'])]]);
    const fil = ['all', ['==', ['get', 'id'], 4558283], ['==', ['get', 'building_code'], 4558283]];
    map.value.setFilter(fil, { layer: 'building' });
    console.log();
  });
}

const getDraw = () => {
  const res = drawInstance.getAll().features;
  console.log(res);
};

const pushData = () => {
  console.log(drawInstance);
  // const item = [121.6041830654936, 31.179804323209552];
  // const {} = drawInstance.getAll().features;
};

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

onMounted(() => {
  console.log('加载完');
  mapInit();
  console.log(map.value);
});
</script>

<style lang="less" scoped>
@import url('./index.less');
</style>
