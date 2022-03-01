<!--
 * @Author: Zed.wu
 * @Date: 2022-02-24 18:12:51
 * @LastEditors: Zed.Wu
 * @LastEditTime: 2022-02-24 18:12:54
-->
<template>
  <div class="bg-cont">
    <div class="title">
      <go-back></go-back>
      <div>创建项目</div>
      <div></div>
    </div>
    <div class="cont">
      放个表单
      <t-button theme="primary"> 确定 </t-button>
      <t-button type="reset" variant="base" theme="default"> 取消 </t-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import goBack from '@/components/goBack/index.vue';
</script>

<style lang="less" scoped></style>
