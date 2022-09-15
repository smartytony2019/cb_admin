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
  return request.post(`/admin/activity/find`, params)
}

/**
 * 查找分页数据
 * @param {Object} params 参数
 * @returns Promise
 */
export async function findPage(params = {}) {
  return request.post(`/admin/activity/findPage/${params.current}/${params.size}`, params)
}

/**
 * 类目
 * @param {Object} params 参数
 * @returns Promise
 */
export async function findCate(params = {}) {
  return request.post(`/admin/activity/findCate`, params)
}

/**
 * 类型
 * @param {Object} params 参数
 * @returns Promise
 */
export async function findType(params = {}) {
  return request.post(`/admin/activity/findType`, params)
}

/**
 * 限制项
 * @param {Object} params 参数
 * @returns Promise
 */
export async function findLimitItem(params = {}) {
  return request.post(`/admin/activity/findLimitItem`, params)
}

/**
 * 规则周期
 * @param {Object} params 参数
 * @returns Promise
 */
export async function findRuleCycle(params = {}) {
  return request.post(`/admin/activity/findRuleCycle`, params)
}

/**
 * 领取模式
 * @param {Object} params 参数
 * @returns Promise
 */
export async function findReceiveMode(params = {}) {
  return request.post(`/admin/activity/findReceiveMode`, params)
}

/**
 * 计算模式
 * @param {Object} params 参数
 * @returns Promise
 */
export async function findCalcMode(params = {}) {
  return request.post(`/admin/activity/findCalcMode`, params)
}

/**
 * 规则项类型
 * @param {Object} params 参数
 * @returns Promise
 */
export async function findRuleItemType(params = {}) {
  return request.post(`/admin/activity/findRuleItemType`, params)
}

/**
 * 获取抽奖记录
 * @param {Object} params 参数
 * @returns Promise
 */
export async function operate(params = {}) {
  return request.post(`/admin/activity/operate`, params)
}

/**
 * 删除
 * @param {Object} params 参数
 * @returns Promise
 */
export async function del(params = {}) {
  return request.post(`/admin/activity/delete/${params.sn}`, params)
}
