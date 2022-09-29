import request from '@/utils/request'

/** ****************
 * 代理
 * ****************/

/**
 * 代理列表
 * @param {Object} params 参数
 * @returns Promise
 */
export async function findPage(params = {}) {
  return request.post(`/admin/agent/findPage/${params.current}/${params.size}`, params)
}

/**
 * 代理返佣比列表
 * @param {Object} params 参数
 * @returns Promise
 */
export async function findRebate(params = {}) {
  return request.post(`/admin/agent/findRebate`, params)
}

/**
 * 代理佣金列表
 * @param {Object} params 参数
 * @returns Promise
 */
export async function findCommissionPage(params = {}) {
  return request.post(`/admin/agent/findCommissionPage/${params.current}/${params.size}`, params)
}

/**
 * 代理佣金列表
 * @param {Object} params 参数
 * @returns Promise
 */
export async function findDomain(params = {}) {
  return request.post(`/admin/agent/findDomain`, params)
}

/**
 * 代理佣金领取记录列表
 * @param {Object} params 参数
 * @returns Promise
 */
export async function findCommissionRecordPage(params = {}) {
  return request.post(`/admin/agent/findCommissionRecordPage/${params.current}/${params.size}`, params)
}
