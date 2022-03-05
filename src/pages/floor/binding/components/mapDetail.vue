<!--
 * @Author: Zed.wu
 * @Date: 2022-01-10 18:25:45
 * @LastEditors: Zed.Wu
 * @LastEditTime: 2022-02-18 15:38:08
-->
<template>
  <div id="map" v-resize="onMapResize">
    <div class="plan-box">
      <div class="steps">
        <t-button @click="goBack">
          <t-icon name="chevron-left-double"></t-icon>
        </t-button>
      </div>

      <div class="content">
        <div class="list">
          <t-button
            v-for="i in 8"
            :key="i"
            class="mb-1"
            style="margin-left: 0"
            :theme="i === 8 ? 'primary' : 'default'"
            >{{ i }}</t-button
          >
        </div>
      </div>
      <div class="steps">
        <t-button @click="handleSelect"> 选择 </t-button>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref, nextTick, defineEmits } from 'vue';
import { useRouter } from 'vue-router';
import { initMap, convertLngLat, initFloor } from '@/utils/mapUtil';
import { getIndoorMap } from '@/service/api/indoormap';
// import request from '@/service/request';

let map;

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
  });
}

// 监听地图容器尺寸，改变地图大小
function onMapResize() {
  map.resize();
}
const emits = defineEmits(['update:show']);
const goBack = () => {
  emits('update:show', false);
};
const router = useRouter();
const handleSelect = () => {
  router.push({
    name: 'projectShow',
    params: {
      projectId: '08e7d2e0-6847-11ec-99af-f93a3c42cf33',
    },
  });
};
onMounted(() => {
  nextTick(() => {
    mapInit();
  });
});
</script>

<style lang="less" scoped>
@import url('./index.less');
.list {
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: center;
}
</style>
