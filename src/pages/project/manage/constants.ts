/*
 * @Author: Zed.wu
 * @Date: 2022-02-10 10:58:02
 * @LastEditors: Zed.Wu
 * @LastEditTime: 2022-02-10 17:26:41
 */
export const COLUMNS = [
  {
    title: '项目名称',
    fixed: 'left',
    width: 160,
    align: 'left',
    ellipsis: true,
    colKey: 'name',
  },
  {
    title: '项目ID',
    width: 200,
    colKey: 'id',
  },
  {
    title: '省市',
    width: 100,
    colKey: 'pro_city',
  },
  {
    title: '地址',
    width: 200,
    ellipsis: true,
    colKey: 'address',
  },
  { title: '项目状态', colKey: 'status', width: 140 /* cell: { col: 'status' }  */ },
  {
    title: '采集人员',
    width: 140,
    ellipsis: true,
    colKey: 'surveyors',
  },
  {
    title: '创建时间',
    width: 160,
    colKey: 'createTime',
  },
  {
    align: 'left',
    fixed: 'right',
    width: 100,
    colKey: 'op',
    title: '操作',
  },
];

export const FLOOR_COLUMNS = [
  { colKey: 'row-select', type: 'multiple', width: 64, fixed: 'left' },
  {
    title: '楼层名称',
    align: 'left',
    width: 300,
    colKey: 'name',
    fixed: 'left',
  },
  {
    align: 'left',
    fixed: 'right',
    width: 200,
    colKey: 'op',
    title: '操作',
  },
];
