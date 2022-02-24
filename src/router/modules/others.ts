/*
 * @Author: Zed.wu
 * @Date: 2022-02-10 09:55:54
 * @LastEditors: Zed.Wu
 * @LastEditTime: 2022-02-24 17:00:18
 */
import Layout from '@/layouts';
// import LogoutIcon from '@/assets/assets-slide-logout.svg';

export default [
  {
    path: '/user',
    name: 'user',
    component: Layout,
    redirect: '/user/index',
    meta: { title: '个人页', icon: 'user-circle', single: true },
    children: [
      {
        path: 'index',
        name: 'userIndex',
        component: () => import('@/pages/user/index.vue'),
        meta: { title: '个人中心' },
      },
    ],
  },
];
