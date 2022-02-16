/*
 * @Author: Zed.wu
 * @Date: 2022-02-10 10:58:02
 * @LastEditors: Zed.Wu
 * @LastEditTime: 2022-02-10 17:26:41
 */
export const COLUMNS = [
  { colKey: 'row-select', type: 'multiple', width: 64, fixed: 'left' },
  {
    title: '项目名称',
    align: 'left',
    width: 300,
    colKey: 'name',
    fixed: 'left',
  },
  { title: '项目状态', colKey: 'status', width: 200, cell: { col: 'status' } },
  {
    title: '项目编号',
    width: 200,
    ellipsis: true,
    colKey: 'no',
  },
  {
    title: '项目类型',
    width: 200,
    ellipsis: true,
    colKey: 'contractType',
  },
  {
    title: '项目收付类型',
    width: 200,
    ellipsis: true,
    colKey: 'paymentType',
  },
  {
    title: '项目金额 (元)',
    width: 200,
    ellipsis: true,
    colKey: 'amount',
  },
  {
    align: 'left',
    fixed: 'right',
    width: 200,
    colKey: 'op',
    title: '操作',
  },
];
