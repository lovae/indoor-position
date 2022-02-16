/*
 * @Author: Zed.wu
 * @Date: 2022-02-10 09:55:54
 * @LastEditors: Zed.Wu
 * @LastEditTime: 2022-02-10 17:49:03
 */
import Layout from '@/layouts';
import DashboardIcon from '@/assets/assets-slide-dashboard.svg';

export default [
  {
    path: '/dashboard',
    component: Layout,
    redirect: '/dashboard/base',
    name: 'dashboard',
    meta: { title: '仪表盘', icon: DashboardIcon },
    children: [
      {
        path: 'base',
        name: 'dashboardBase',
        component: () => import('@/pages/dashboard/base/index.vue'),
        meta: { title: '概览仪表盘' },
      },
      {
        path: 'detail',
        name: 'dashboardDetail',
        component: () => import('@/pages/dashboard/detail/index.vue'),
        meta: { title: '统计报表' },
      },
    ],
  },
  {
    path: '/demo',
    name: 'demo',
    meta: { title: '示例页', icon: 'layers' },
    component: Layout,
    children: [
      {
        path: 'planBeacon',
        name: 'planBeacon',
        component: () => import('@/pages/demo/plan-beacon/index.vue'),
        meta: { title: '信标规划' },
      },
    ],
  },
  {
    path: '/manageProject',
    name: 'manageProject',
    meta: { title: '项目管理', icon: 'server' },
    component: Layout,
    children: [
      {
        path: 'manageProject',
        name: 'manageProject',
        component: () => import('@/pages/manage-project/index.vue'),
        meta: { title: '项目管理' },
      },
    ],
  },
];
