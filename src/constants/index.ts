/*
 * @Author: Zed.wu
 * @Date: 2022-02-10 09:55:54
 * @LastEditors: Zed.Wu
 * @LastEditTime: 2022-02-23 17:01:24
 */
// 项目状态枚举
export const CONTRACT_STATUS = {
  FAIL: 0,
  AUDIT_PENDING: 1,
  EXEC_PENDING: 2,
  EXECUTING: 3,
  FINISH: 4,
};

export const CONTRACT_STATUS_OPTIONS = [
  { value: CONTRACT_STATUS.FAIL, label: '审核失败' },
  { value: CONTRACT_STATUS.AUDIT_PENDING, label: '待审核' },
  { value: CONTRACT_STATUS.EXEC_PENDING, label: '待履行' },
  { value: CONTRACT_STATUS.EXECUTING, label: '审核成功' },
  { value: CONTRACT_STATUS.FINISH, label: '已完成' },
];

// 项目类型枚举
export const CONTRACT_TYPES = {
  MAIN: 0,
  SUB: 1,
  SUPPLEMENT: 2,
};

export const CONTRACT_TYPE_OPTIONS = [
  { value: CONTRACT_TYPES.MAIN, label: '主项目' },
  { value: CONTRACT_TYPES.SUB, label: '子项目' },
  { value: CONTRACT_TYPES.SUPPLEMENT, label: '补充项目' },
];

// 项目收付类型枚举
export const CONTRACT_PAYMENT_TYPES = {
  PAYMENT: 0,
  RECIPT: 1,
};

// 通知的优先级对应的TAG类型
export const NOTIFICATION_TYPES = {
  low: 'primary',
  middle: 'warning',
  high: 'danger',
};

// 项目用到的
export const PROJECT_STATUS = {
  0: {
    theme: 'default',
    value: '关闭',
  },
  1: {
    theme: 'success',
    value: '开启',
  },
};

export const NEED_BEACON = {
  0: '不',
  1: '需要',
};

export const BEACON_TYPES = {
  0: 'wifi',
  1: '蓝牙',
};
export const TECHNOLOGYS = {
  0: '权重',
  1: '指纹',
};

export const MAP_TYPES = {
  0: '内部地图',
  1: '用户上传',
};

export const FLOOR_STATUS = {
  0: {
    theme: 'default',
    value: '规划中',
  },
  1: {
    theme: 'primary',
    value: '采集中',
  },
  2: {
    theme: 'warning',
    value: '验证审核中',
  },
  3: {
    theme: 'success',
    value: '发布上线',
  },
};
