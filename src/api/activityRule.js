import request from '@/utils/request'

/** ****************
 * 活动管理
 * ****************/

/**
 * 查找分页数据
 * @param {Object} params 参数
 * @returns Promise
 */
export async function find(params = {}) {
  return request.post(`/admin/activity/rule/find/${params.sn}`, params)
}

/**
 * 查找分页数据
 * @param {Object} params 参数
 * @returns Promise
 */
export async function findItems(params = {}) {
  return request.post(`/admin/activity/rule/findItems/${params.sn}`, params)
}

/**
 * 创建
 * @param {Object} params 参数
 * @returns Promise
 */
export async function operate(params = {}) {
  return request.post(`/admin/activity/rule/operate`, params)
}

