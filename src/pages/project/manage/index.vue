<template>
  <div class="list-common-table">
    <t-row>
      <t-col flex="auto">
        <t-form ref="form" :data="formData" :label-width="0" colon @reset="onReset" @submit="onSubmit">
          <t-row :gutter="[16, 16]">
            <t-col :span="3">
              <t-form-item name="name">
                <t-input
                  v-model="formData.name"
                  type="search"
                  placeholder="请输入项目名称"
                  :style="{ minWidth: '134px' }"
                />
              </t-form-item>
            </t-col>
            <!-- <t-col flex="1">
              <t-form-item name="status">
                <t-select v-model="formData.status" :options="CONTRACT_STATUS_OPTIONS" placeholder="请选择项目状态" />
              </t-form-item>
            </t-col> -->
            <t-col :span="3">
              <t-form-item name="no">
                <t-input v-model="formData.no" placeholder="请输入项目ID" :style="{ minWidth: '134px' }" />
              </t-form-item>
            </t-col>
            <t-col :span="3">
              <t-button theme="primary" type="submit"> 查询 </t-button>
              <t-button type="reset" variant="base" theme="default"> 重置 </t-button>
            </t-col>
          </t-row>
        </t-form>
      </t-col>
      <t-col flex="60px">
        <t-button theme="primary" @click="handleClickAdd">创建</t-button>
      </t-col>
    </t-row>

    <div class="table-container">
      <t-table
        :data="data"
        :columns="COLUMNS"
        :row-key="rowKey"
        :vertical-align="verticalAlign"
        :hover="hover"
        :pagination="pagination"
        :loading="dataLoading"
        @page-change="rehandlePageChange"
        @change="rehandleChange"
      >
        <template #status="{ row }">
          <t-tag :theme="PROJECT_STATUS[row.status].theme" variant="light">
            {{ PROJECT_STATUS[row.status].value }}
          </t-tag>
        </template>
        <template #pro_city="{ row }">
          <p>{{ row.province + row.city }}</p>
        </template>
        <template #op="slotProps">
          <a class="t-button-link" @click="rehandleClickOp(slotProps)">查看</a>
          <a class="t-button-link" @click="handleClickDelete(slotProps)">删除</a>
        </template>
      </t-table>
      <t-dialog
        v-model:visible="confirmVisible"
        header="确认删除当前所选项目？"
        :body="confirmBody"
        :on-cancel="onCancel"
        @confirm="onConfirmDelete"
      />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue';
import { MessagePlugin } from 'tdesign-vue-next';
import { useRouter } from 'vue-router';
// import { getList } from '@/service/api/project/index';

import { PROJECT_STATUS } from '@/constants';
import { COLUMNS } from './constants';

const searchForm = {
  name: '',
  no: undefined,
  status: undefined,
  type: '',
};

export default defineComponent({
  name: 'ListTable',
  components: {},
  setup() {
    const formData = ref({ ...searchForm });
    const tableConfig = {
      rowKey: 'index',
      verticalAlign: 'top',
      hover: true,
    };
    const pagination = ref({
      defaultPageSize: 20,
      total: 100,
      defaultCurrent: 1,
    });
    const confirmVisible = ref(false);

    const data = ref([]);

    const dataLoading = ref(false);
    const fetchData = async () => {
      dataLoading.value = true;
      try {
        /* const res = await getList();
        if (res.code === 0) {
          const { list = [] } = res.data;
          data.value = list;
          pagination.value = {
            ...pagination.value,
            total: list.length,
          };
        } */
        data.value = [
          {
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
          },
          {
            id: '08e7d2e0-6847-11ec-99af-f93a3c42cf34',
            name: '室内定位2',
            description: '室内定位平台详细介绍。。。',
            province: '湖北省',
            city: '武汉市',
            address: '光谷中建宝谷商务中心2',
            surveyors: '张三',
            auditors: '王五',
            needBeacon: 0,
            beaconType: 0,
            technology: 0,
            releaseTime: '2021-11-24 17:30:00',
            createTime: '2021-11-24 17:30:00',
            updateTime: '2021-11-24 17:30:00',
            status: 0,
            createdBy: '55e7d2e0-6847-11ec-99af-f93a3c42cf33',
          },
        ];
        pagination.value = {
          ...pagination.value,
          total: data.value.length,
        };
      } catch (e) {
        console.log(e);
      } finally {
        dataLoading.value = false;
      }
    };

    const deleteIdx = ref(null);
    const confirmBody = computed(() => {
      if (deleteIdx.value) {
        const { name } = deleteIdx.value;
        return `删除后，${name}的所有项目信息将被清空，且无法恢复`;
      }
      return '';
    });

    const resetIdx = () => {
      deleteIdx.value = null;
    };

    const onConfirmDelete = () => {
      // 真实业务请发起请求
      // data.value.splice(deleteIdx.value, 1);

      pagination.value.total = data.value.length;
      confirmVisible.value = false;
      MessagePlugin.success('删除成功');
      resetIdx();
    };

    const onCancel = () => {
      resetIdx();
    };
    const router = useRouter();
    onMounted(() => {
      fetchData();
    });

    return {
      data,
      COLUMNS,
      PROJECT_STATUS,
      formData,
      pagination,
      confirmVisible,
      confirmBody,
      ...tableConfig,
      onConfirmDelete,
      onCancel,
      dataLoading,
      handleClickDelete({ row }) {
        deleteIdx.value = row;
        confirmVisible.value = true;
      },
      onReset(val) {
        console.log(val);
      },
      onSubmit(val) {
        console.log(val);
      },
      rehandlePageChange(curr, pageInfo) {
        console.log('分页变化', curr, pageInfo);
      },
      rehandleChange(changeParams, triggerAndData) {
        console.log('统一Change', changeParams, triggerAndData);
      },
      rehandleClickOp({ text, row }) {
        console.log(text, row);
        router.push(`/project/${row.id}`);
        // router.push('/project/add');
      },
      handleClickAdd() {
        router.push('/project/add');
      },
    };
  },
});
</script>

<style lang="less">
@import '@/style/variables.less';
.list-common-table {
  background-color: @bg-color-container;
  padding: 30px 32px;
  border-radius: @border-radius;

  .table-container {
    margin-top: 30px;
  }
}

.form-item-content {
  width: 100%;
}

.operation-container {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  .expand {
    .t-button__text {
      display: flex;
      align-items: center;
    }
    .t-icon {
      margin-left: 4px;
      transition: transform 0.3s ease;
    }
  }
}

.payment-col {
  display: flex;

  .trend-container {
    display: flex;
    align-items: center;
    margin-left: 8px;
  }
}
</style>
