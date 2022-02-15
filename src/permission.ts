/*
 * @Author: Zed.wu
 * @Date: 2022-02-10 09:55:54
 * @LastEditors: Zed.Wu
 * @LastEditTime: 2022-02-15 18:05:03
 */
import { MessagePlugin } from 'tdesign-vue-next';
import NProgress from 'nprogress'; // progress bar
import 'nprogress/nprogress.css'; // progress bar style

import store from '@/store';
import router from '@/router';
// import { TOKEN_NAME } from './config/global';

NProgress.configure({ showSpinner: false });

const whiteListRouters = store.getters['permission/whiteListRouters'];

router.beforeEach(async (to, from, next) => {
  NProgress.start();

  const token = store.getters['user/token'];

  if (token) {
    if (to.path === '/login') {
      setTimeout(() => {
        store.dispatch('user/logout');
        store.dispatch('permission/restore');
      });
      next();
      return;
    }
    /* if (localStorage.getItem(TOKEN_NAME)) {
      next({ ...to });
    } else {
      MessagePlugin.error('登录已失效，请重新登录');
      await store.commit('user/removeToken');
      next(`/login?redirect=${to.path}`);
    }
    NProgress.done(); */
    const roles = store.getters['user/roles'];
    if (roles && roles.length > 0) {
      next();
    } else {
      try {
        // await store.dispatch('user/getUserInfo');

        await store.dispatch('permission/initRoutes', store.getters['user/roles']);

        next({ ...to });
      } catch (error) {
        console.log(error);
        MessagePlugin.error(error);
        await store.commit('user/removeToken');
        next(`/login?redirect=${to.path}`);
        NProgress.done();
      }
    }
  } else {
    /* white list router */
    if (whiteListRouters.indexOf(to.path) !== -1) {
      next();
    } else {
      next(`/login?redirect=${to.path}`);
    }
    NProgress.done();
  }
});

router.afterEach(() => {
  NProgress.done();
});
