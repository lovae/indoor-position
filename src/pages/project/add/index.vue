<!--
 * @Author: Zed.wu
 * @Date: 2022-02-24 18:12:51
 * @LastEditors: Zed.Wu
 * @LastEditTime: 2022-02-24 18:12:54
-->
<template>
  <div class="bg-cont">
    <div v-show="!createSuccess" class="title">
      <go-back></go-back>
    </div>
    <div class="form-container">
      <t-form v-if="!createSuccess" :data="formData" label-align="left">
        <div class="form-title">创建项目</div>
        <t-form-item label="项目名称" name="">
          <t-input v-model="formData.name" clearable></t-input>
        </t-form-item>
        <t-form-item label="项目描述" name="">
          <t-textarea v-model="formData.description" clearable :autosize="true"></t-textarea>
        </t-form-item>
        <t-form-item label="省市" name="">
          <t-input v-model="formData.province"></t-input><span class="mr-4 ml-1">省</span>
          <t-input v-model="formData.city"></t-input><span class="ml-1">市</span>
        </t-form-item>
        <t-form-item label="详细地址" name="">
          <t-textarea v-model="formData.address" clearable :autosize="true"></t-textarea>
        </t-form-item>
        <t-form-item label="部署信标" name="">
          <t-radio-group v-model="formData.needBeacon">
            <t-radio :value="0">不需要</t-radio>
            <t-radio :value="1">需要</t-radio>
          </t-radio-group>
        </t-form-item>
        <t-form-item v-show="formData && formData.needBeacon == 1" label="信标类型" name="">
          <t-radio-group v-model="formData.beaconType">
            <t-radio :value="0">蓝牙</t-radio>
            <t-radio :value="1">WIFI</t-radio>
            <t-radio :value="1">UWB</t-radio>
          </t-radio-group>
        </t-form-item>
        <t-form-item label="技术方案" name="">
          <t-radio-group v-model="formData.technology">
            <t-radio :value="0">指纹</t-radio>
            <t-radio :value="1">权重</t-radio>
          </t-radio-group>
        </t-form-item>
        <t-form-item label="采集人员" name="">
          <t-input v-model="formData.surveyors" clearable></t-input>
        </t-form-item>
        <t-form-item label="审核人员" name="">
          <t-input v-model="formData.auditors" clearable></t-input>
        </t-form-item>
        <t-form-item>
          <t-button theme="primary" type="submit" @click="handleSubmit">提交</t-button>
          <t-button theme="default" variant="base" type="reset" @click="handleCancel">取消</t-button>
        </t-form-item>
      </t-form>
      <!-- 成功提醒 -->
      <div v-else class="result-success">
        <t-icon class="result-success-icon" name="check-circle" />
        <div class="result-success-title">项目已创建成功</div>
        <div class="result-success-describe">可以联系采集人员采集</div>
        <div>
          <t-button @click="handleCancel"> 返回项目列表 </t-button>
          <t-button theme="default"> 查看项目 </t-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
// import { MessagePlugin } from 'tdesign-vue-next';
import goBack from '@/components/goBack/index.vue';
import { IProject } from '@/service/api/project/types';

const createSuccess = ref<boolean>(false);

const formData = ref<IProject>({
  name: '',
  description: '',
  province: '',
  city: '',
  address: '',
  surveyors: '',
  auditors: '',
  needBeacon: 1,
  beaconType: 0,
  technology: 0,
});
const handleSubmit = () => {
  console.log(formData.value);
  setTimeout(() => {
    createSuccess.value = true;
  }, 1000);
};
const handleCancel = () => {
  history.back();
};
</script>

<style lang="less" scoped>
@import '@/style/variables.less';

.result-success {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 75vh;

  &-icon {
    font-size: 64px;
    color: @success-color;
  }

  &-title {
    margin-top: 16px;
    font-size: 20px;
    color: @text-color-primary;
    text-align: center;
    line-height: 22px;
    font-weight: 500;
  }

  &-describe {
    margin: 8px 0 32px;
    font-size: 14px;
    color: @text-color-primary;
    line-height: 22px;
  }
}
</style>
