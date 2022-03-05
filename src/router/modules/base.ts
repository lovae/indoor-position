/*
 * @Author: Zed.wu
 * @Date: 2022-02-10 09:55:54
 * @LastEditors: Zed.Wu
 * @LastEditTime: 2022-02-25 14:49:29
 */
import Layout from '@/layouts';

export default [
  {
    path: '/project',
    name: 'project',
    component: Layout,
    redirect: '/project/manage',
    meta: { title: '项目管理', icon: 'server', single: true },
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
      {
        path: ':projectId',
        name: 'projectShow',
        component: () => import('@/pages/project/show/index.vue'),
        meta: { title: '查看项目', hide: true },
      },
      {
        path: ':projectId/floor/:floorId',
        name: 'floorShow',
        component: () => import('@/pages/floor/show/index.vue'),
        meta: { title: '查看楼层', hide: true },
      },
      {
        path: ':projectId/floor/binding',
        name: 'floorBinding',
        component: () => import('@/pages/floor/binding/index.vue'),
        meta: { title: '绑定地图', hide: true },
      },
    ],
  },
];
