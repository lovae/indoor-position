<!--
 * @Author: Zed.wu
 * @Date: 2022-02-24 18:12:51
 * @LastEditors: Zed.Wu
 * @LastEditTime: 2022-02-25 14:51:28
-->
<template>
  <div class="bg-cont">
    <div class="title">
      <go-back></go-back>
      <div>项目详情 {{ projectId }}</div>
      <t-button theme="primary" @click="handleClickAdd"> 新增 </t-button>
    </div>
    <div class="cont">
      放个楼层列表
      <t-table :data="data" row-key="id" vertical-align="top" :hover="true" :columns="COLUMNS">
        <template #op="slotProps">
          <t-button theme="primary" @click="handleClickShow"> 查看 </t-button>
          <t-button type="reset" variant="base" theme="default" @click="handleClickDelete(slotProps)"> 删除 </t-button>
        </template>
      </t-table>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from '@vue/reactivity';
import { useRoute, useRouter } from 'vue-router';
import goBack from '@/components/goBack/index.vue';

const COLUMNS = [
  {
    title: '楼层名称',
    align: 'left',
    width: 300,
    colKey: 'name',
    fixed: 'left',
  },
  {
    align: 'left',
    fixed: 'right',
    width: 200,
    colKey: 'op',
    title: '操作',
  },
];

const route = useRoute();
const router = useRouter();
const { projectId } = route.params;
console.log(projectId);

const data = ref([
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
]);
const handleClickAdd = () => {
  router.push({
    name: 'floorAdd',
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

<style lang="less" scoped></style>
