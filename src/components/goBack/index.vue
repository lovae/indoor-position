<template>
  <div class="mc-back" @click="goBack"><t-icon :name="icon" :size="size"></t-icon>{{ title || '' }}</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'GoBack',
  props: {
    title: {
      type: String || (Boolean as PropType<string | boolean>),
      default: '返回',
    },
    size: {
      type: String as PropType<string>,
      default: '2em',
    },
    icon: {
      type: String as PropType<string>,
      default: 'chevron-left',
    },
  },
  setup() {
    // const emits =defineEmits(['click'])
    return {
      goBack() {
        history.back();
      },
    };
  },
});
</script>

<style lang="less" scoped>
.mc-back {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
</style>
