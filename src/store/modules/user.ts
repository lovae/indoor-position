/*
 * @Author: Zed.wu
 * @Date: 2022-02-15 17:22:18
 * @LastEditors: Zed.Wu
 * @LastEditTime: 2022-02-16 11:45:04
 */
import { TOKEN_NAME, USER_ID } from '@/config/global';
import { getInfo, login } from '@/service/api/user/index';

const InitUserInfo = null;

// 定义的state初始值
const state = {
  token: localStorage.getItem(TOKEN_NAME) || '', // 默认token不走权限
  userId: localStorage.getItem(USER_ID) || '',
  userInfo: InitUserInfo,
};

const mutations = {
  setToken(state, token) {
    localStorage.setItem(TOKEN_NAME, token);
    state.token = token;
  },
  removeToken(state) {
    localStorage.removeItem(TOKEN_NAME);
    state.token = '';
  },
  setUserId(state, userId) {
    localStorage.setItem(USER_ID, userId);
    state.userId = userId;
  },
  removeUserId(state) {
    localStorage.removeItem(USER_ID);
    state.userId = '';
  },
  setUserInfo(state, userInfo) {
    state.userInfo = userInfo;
  },
};

const getters = {
  token: (state) => {
    return state.token;
  },
  userId: (state) => {
    return state.userId;
  },
  roles: () => {
    // 在这里可以控制角色权限，配合src/permission.ts
    return state.userInfo?.role?.name;
    // return ['ALL_ROUTERS'];
  },
};

const actions = {
  async login({ commit }, userInfo) {
    const res = await login(userInfo);
    // console.log(res);
    commit('setToken', res.token);
    commit('setUserId', res.userId);
    // const info = await getInfo();
    // console.log(info[0]);
    // commit('setUserInfo', info[0]);
  },
  async getUserInfo({ commit }) {
    const res = await getInfo();
    commit('setUserInfo', res[0]);
  },
  async logout({ commit }) {
    commit('removeToken');
    commit('removeUserId');
    commit('setUserInfo', InitUserInfo);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
