<template>
  <div v-if="info.name" class="cont">
    <t-row>
      <t-col flex="1">
        <h3>{{ info.name }}</h3>
      </t-col>
      <t-col :span="2">
        <t-tag :theme="PROJECT_STATUS[info.status].theme">{{ PROJECT_STATUS[info.status].value }}</t-tag>
      </t-col>
    </t-row>
    <div class="id mt-2">{{ info.id }}</div>
    <div>{{ info.province }}·{{ info.city }} {{ info.address }}</div>
    <t-divider class="my-2" dashed />
    <t-form label-width="80px">
      <t-form-item class="mb-0" label="采集人员">{{ info.surveyors }}</t-form-item>
      <t-form-item class="mb-0" label="审核人员">{{ info.auditors }}</t-form-item>
      <t-form-item class="mb-0" label="创建时间">{{ info.createTime }}</t-form-item>
      <t-form-item class="mb-0" label="更新时间">{{ info.updateTime }}</t-form-item>
      <t-form-item class="mb-0" label="发布时间">{{ info.updateTime }}</t-form-item>
      <t-form-item class="mb-0" label="绑定地图"></t-form-item>
      <t-form-item class="mb-0" label="备注">{{ info.description }}</t-form-item>
    </t-form>
  </div>
  <div v-else>暂无信息</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { IProject } from '@/service/api/project/types';
import { PROJECT_STATUS } from '@/constants';

export default defineComponent({
  name: 'InfoCard',
  props: {
    info: {
      type: Object as PropType<IProject>,
      default: () => {
        return {};
      },
    },
  },
  setup() {
    return { PROJECT_STATUS };
  },
});
</script>

<style lang="less" scoped>
@import '@/style/variables';
.cont {
  padding: 1rem;
  border-radius: 4px;
  background-color: @bg-color-container;
  // box-shadow: @shadow-1;
}
.id {
  // color: @font-gray-3;
  color: @text-color-placeholder;
  font-size: @font-size-s;
}
</style>
