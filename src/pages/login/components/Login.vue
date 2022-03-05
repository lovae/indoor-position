<!--
 * @Author: Zed.wu
 * @Date: 2022-02-10 09:55:54
 * @LastEditors: Zed.Wu
 * @LastEditTime: 2022-02-15 17:59:54
-->
<template>
  <t-form ref="form" class="item-container" :data="formData" :rules="FORM_RULES" label-width="0" @submit="onSubmit">
    <t-radio-group v-model="formData.type" class="login-type-radio" size="large" variant="default-filled">
      <t-radio-button value="standard"> 账号密码登录 </t-radio-button>
      <t-radio-button value="ldap"> LDAP登录 </t-radio-button>
    </t-radio-group>
    <t-form-item name="username">
      <t-input v-model="formData.username" size="large" clearable placeholder="请输入账号">
        <template #prefix-icon>
          <t-icon name="user" />
        </template>
      </t-input>
    </t-form-item>

    <t-form-item name="password">
      <t-input
        v-model="formData.password"
        size="large"
        :type="showPsw ? 'text' : 'password'"
        clearable
        placeholder="请输入密码"
      >
        <template #prefix-icon>
          <t-icon name="lock-on" />
        </template>
        <template #suffix-icon>
          <t-icon :name="showPsw ? 'browse' : 'browse-off'" @click="showPsw = !showPsw" />
        </template>
      </t-input>
    </t-form-item>

    <div class="check-container remember-pwd">
      <t-checkbox v-model="checked">记住账号</t-checkbox>
    </div>

    <t-form-item class="btn-container">
      <t-button block size="large" type="submit"> 登录 </t-button>
    </t-form-item>
  </t-form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { MessagePlugin } from 'tdesign-vue-next';
import md5 from 'md5';

const INITIAL_DATA = {
  username: 'zed.wu',
  password: 'WZwzd23dzw',
  type: 'standard',
};

const FORM_RULES = {
  username: [{ required: true, message: '账号必填', type: 'error' }],
  password: [{ required: true, message: '密码必填', type: 'error' }],
};

export default defineComponent({
  components: {},
  setup() {
    const formData = ref({ ...INITIAL_DATA });
    const showPsw = ref(false);

    const router = useRouter();
    const store = useStore();

    const checked = ref(false);

    const onSubmit = async ({ validateResult }) => {
      if (validateResult === true) {
        try {
          const params = { ...formData.value };
          const { type, password } = formData.value;
          if (type === 'standard') {
            params.password = md5(password);
          }
          await store.dispatch('user/login', params);
          MessagePlugin.success('登录成功');
          router.push({
            path: '/dashboard/base',
          });
        } catch (e) {
          // MessagePlugin.error(e.message);
        }
      }
    };

    return {
      FORM_RULES,
      formData,
      showPsw,
      checked,
      onSubmit,
    };
  },
});
</script>
