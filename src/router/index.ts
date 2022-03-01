/*
 * @Author: Zed.wu
 * @Date: 2022-02-16 15:42:09
 * @LastEditors: Zed.Wu
 * @LastEditTime: 2022-02-25 16:40:36
 */
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import baseRouters from './modules/base';
import componentsRouters from './modules/components';
import othersRouters from './modules/others';

// 存放动态路由
export const asyncRouterList: Array<RouteRecordRaw> = [...baseRouters, ...componentsRouters, ...othersRouters];

// 存放固定的路由
const defaultRouterList: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/login/index.vue'),
  },
  {
    path: '/',
    redirect: '/dashboard/base',
    component: () => import('@/layouts/blank.vue'),
  },
];

export const page404 = {
  path: '/:w+',
  name: '404Page',
  redirect: '/result/404',
};

const router = createRouter({
  history: createWebHistory(),
  routes: defaultRouterList,
  scrollBehavior() {
    return {
      el: '#app',
      top: 0,
      behavior: 'smooth',
    };
  },
});

export default router;
