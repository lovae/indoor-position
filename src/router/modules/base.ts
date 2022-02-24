/*
 * @Author: Zed.wu
 * @Date: 2022-02-10 09:55:54
 * @LastEditors: Zed.Wu
 * @LastEditTime: 2022-02-24 18:18:03
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
    path: '/project',
    name: 'project',
    meta: { title: '项目', icon: 'server' },
    component: Layout,
    children: [
      {
        path: 'manage',
        name: 'projectManage',
        component: () => import('@/pages/project/manage/index.vue'),
        meta: { title: '项目管理' },
      },
      {
        path: 'add',
        name: 'projectAdd',
        component: () => import('@/pages/project/add/index.vue'),
        meta: { title: '新建项目', hide: true },
      },
    ],
  },
];
