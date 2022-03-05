<!--
 * @Author: Zed.wu
 * @Date: 2022-02-24 18:12:51
 * @LastEditors: Zed.Wu
 * @LastEditTime: 2022-02-25 14:51:28
-->
<template>
  <div>
    <!-- <div class="title">
      <go-back></go-back>
    </div> -->
    <div class="cont">
      <t-row :gutter="[20, 20]" justify="space-between">
        <t-col flex="1">
          <t-table
            :data="data"
            row-key="id"
            :hover="true"
            :stripe="true"
            :columns="COLUMNS"
            class="table"
            @rowClick="handleClickShow"
          >
            <template #mapType="{ row }">
              <p>{{ MAP_TYPES[row.mapType] }}</p>
            </template>
            <template #status="{ row }">
              <t-tag :theme="FLOOR_STATUS[row.status].theme">{{ FLOOR_STATUS[row.status].value }}</t-tag>
            </template>
            <template #op="slotProps">
              <!-- <t-button theme="primary" @click="handleClickShow"> 查看 </t-button> -->
              <t-button type="reset" variant="base" theme="default" @click.stop="handleClickDelete(slotProps)">
                删除
              </t-button>
            </template>
          </t-table>
        </t-col>
        <t-col flex="360px">
          <info-card :info="projectInfo"></info-card>

          <t-button class="fixed-r-b" shape="circle" theme="primary" variant="base" @click="handleClickAdd">
            <t-icon name="add" size="28"></t-icon>
          </t-button>
        </t-col>
      </t-row>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from '@vue/reactivity';
import { useRoute, useRouter } from 'vue-router';
// import goBack from '@/components/goBack/index.vue';
import infoCard from '../components/projectInfo.vue';
import { COLUMNS } from './constants';
import { MAP_TYPES, FLOOR_STATUS } from '@/constants';
import { IFloor } from '@/service/api/floor/types';

const route = useRoute();
const router = useRouter();
const { projectId } = route.params;
console.log(projectId);

const projectInfo = ref({
  id: '08e7d2e0-6847-11ec-99af-f93a3c42cf33',
  name: '室内定位',
  description: '室内定位平台详细介绍。。。',
  province: '湖北省',
  city: '武汉市',
  address: '光谷中建宝谷商务中心',
  surveyors: '张三，李四',
  auditors: '王五',
  needBeacon: 1,
  beaconType: 1,
  technology: 1,
  releaseTime: '2021-11-24 17:30:00',
  createTime: '2021-11-24 17:30:00',
  updateTime: '2021-11-24 17:30:00',
  status: 1,
  createdBy: '55e7d2e0-6847-11ec-99af-f93a3c42cf33',
});

const data = ref<IFloor[]>([
  {
    id: '08e7d2e0-6847-11ec-99af-f93a3c42cf33',
    projectId: '99e7d2e0-6847-11ec-99af-f93a3c42cf33',
    name: 'F1',
    floorLevel: 1,
    mapType: 1,
    mapId: 10001,
    mapFloorId: 4001,
    mapFloorName: 'F1',
    mapMetadata: { type: 'IMG', url: 'localhost:8080/1.png', width: 500, height: 400 },
    releaseTime: '2021-11-24 17:30:00',
    createTime: '2021-11-24 17:30:00',
    updateTime: '2021-11-24 17:30:00',
    status: 1,
    createdBy: '55e7d2e0-6847-11ec-99af-f93a3c42cf33',
  },
  {
    id: '08e7d2e0-6847-11ec-99af-f93a3c42cf34',
    projectId: '99e7d2e0-6847-11ec-99af-f93a3c42cf33',
    name: 'F2',
    floorLevel: 2,
    mapType: 0,
    mapId: 10001,
    mapFloorId: 4001,
    mapFloorName: 'F2',
    mapMetadata: { type: 'IMG', url: 'localhost:8080/1.png', width: 500, height: 400 },
    releaseTime: '2021-11-24 17:30:00',
    createTime: '2021-11-24 17:30:00',
    updateTime: '2021-11-24 17:30:00',
    status: 0,
    createdBy: '55e7d2e0-6847-11ec-99af-f93a3c42cf33',
  },
  {
    id: '08e7d2e0-6847-11ec-99af-f93a3c42cf35',
    projectId: '99e7d2e0-6847-11ec-99af-f93a3c42cf33',
    name: 'F3',
    floorLevel: 3,
    mapType: 1,
    mapId: 10001,
    mapFloorId: 4001,
    mapFloorName: 'F1',
    mapMetadata: { type: 'IMG', url: 'localhost:8080/1.png', width: 500, height: 400 },
    releaseTime: '2021-11-24 17:30:00',
    createTime: '2021-11-24 17:30:00',
    updateTime: '2021-11-24 17:30:00',
    status: 3,
    createdBy: '55e7d2e0-6847-11ec-99af-f93a3c42cf33',
  },
  {
    id: '08e7d2e0-6847-11ec-99af-f93a3c42cf36',
    projectId: '99e7d2e0-6847-11ec-99af-f93a3c42cf33',
    name: 'F4',
    floorLevel: 4,
    mapType: 1,
    mapId: 10001,
    mapFloorId: 4001,
    mapFloorName: 'F1',
    mapMetadata: { type: 'IMG', url: 'localhost:8080/1.png', width: 500, height: 400 },
    releaseTime: '2021-11-24 17:30:00',
    createTime: '2021-11-24 17:30:00',
    updateTime: '2021-11-24 17:30:00',
    status: 2,
    createdBy: '55e7d2e0-6847-11ec-99af-f93a3c42cf33',
  },
]);
const handleClickAdd = () => {
  router.push({
    name: 'floorBinding',
  });
};

const handleClickShow = () => {
  router.push({
    name: 'floorShow',
    params: {
      floorId: '08e7d2e0-6847-11ec-99af-f93a3c42cf33',
    },
  });
};
const handleClickDelete = (row) => {
  console.log(row);
};
</script>

<style lang="less" scoped>
@import '@/style/variables';
.table {
  padding: 0 1rem 1rem;
  border-radius: 4px;
  overflow: hidden;
  background-color: @bg-color-container;
  box-shadow: @shadow-1;
}
</style>
