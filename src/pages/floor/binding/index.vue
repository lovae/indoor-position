<template>
  <div v-show="!showDetail" class="bg-cont">
    <div class="title">
      <go-back @click="handleBack"></go-back>
      <h4>绑定地图</h4>
      <div></div>
    </div>
    <div class="cont">
      <div class="search-box mb-2">
        <t-input style="width: 200px" placeholder="请输入地图名称"></t-input>
        <t-button class="ml-2">查询</t-button>
      </div>
      <t-table :data="data" row-key="id" :hover="true" :columns="COLUMNS" class="table" @rowClick="handleClickShow">
        <template #floorNumber="{ row }">
          <p>{{ row.floors.length }}</p>
        </template>
        <template #op="slotProps">
          <!-- <t-button theme="primary" @click="handleClickShow"> 查看 </t-button> -->
          <t-button type="reset" variant="base" theme="default" @click.stop="handleClickSelect(slotProps)">
            选择
          </t-button>
        </template>
      </t-table>
    </div>
  </div>
  <MapDetail v-if="showDetail" v-model:show="showDetail" />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import goBack from '@/components/goBack/index.vue';
import { COLUMNS, res } from './constants';
import { IInternalMap } from '@/service/api/map/types';
import MapDetail from './components/mapDetail.vue';

const router = useRouter();
const handleBack = () => {
  console.log(1323);
  router.push({
    name: 'projectShow',
    params: {
      projectId: '08e7d2e0-6847-11ec-99af-f93a3c42cf33',
    },
  });
};
onMounted(() => {
  console.log('绑定地图');
});
const data = ref<IInternalMap[]>(res.malls);

const showDetail = ref<boolean>(false);
const handleClickShow = (row) => {
  console.log(row);
  showDetail.value = true;
};

const handleClickSelect = (row) => {
  console.log(row);
  router.push({
    name: 'projectShow',
    params: {
      projectId: '08e7d2e0-6847-11ec-99af-f93a3c42cf33',
    },
  });
};
</script>

<style lang="less" scoped>
.search-box {
  display: flex;
}
</style>
