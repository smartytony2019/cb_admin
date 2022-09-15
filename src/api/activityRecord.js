import request from '@/utils/request'

/** ****************
 * 活动记录
 * ****************/

/**
 * 查找分页数据
 * @param {Object} params 参数
 * @returns Promise
 */
export async function findPage(params = {}) {
  return request.post(`/admin/activity/record/findPage/${params.current}/${params.size}`, params)
}

/**
 * 创建
 * @param {Object} params 参数
 * @returns Promise
 */
export async function operate(params = {}) {
  return request.post(`/admin/activity/rule/operate`, params)
}

