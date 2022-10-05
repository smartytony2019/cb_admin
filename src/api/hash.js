import request from '@/utils/request'

/** ****************
 * 注单管理
 * ****************/

/**
 * 查询玩法
 * @param {Object} params 参数
 * @returns Promise
 */
export async function findPlay(params = {}) {
  return request.post(`/admin/hash/findPlay`, params)
}

/**
 * 查询赔率
 * @param {Object} params 参数
 * @returns Promise
 */
export async function findOdds(params = {}) {
  return request.post(`/admin/hash/findOdds/${params.gameId}`, params)
}

/**
 * 查询赔率
 * @param {Object} params 参数
 * @returns Promise
 */
export async function findResult(params = {}) {
  return request.post(`/admin/hash/findResult/${params.current}/${params.size}`, params)
}

/**
 * 查询注单
 * @param {Object} params 参数
 * @returns Promise
 */
export async function findBetPage(params = {}) {
  return request.post(`/admin/hash/findBetPage/${params.current}/${params.size}`, params)
}

/**
 * 查询离线注单
 * @param {Object} params 参数
 * @returns Promise
 */
export async function findOfflineBetPage(params = {}) {
  return request.post(`/admin/hash/findOfflineBetPage/${params.current}/${params.size}`, params)
}

/**
 * 订单状态
 * @param {Object} params 参数
 * @returns Promise
 */
export async function findBetStatus(params = {}) {
  return request.post(`/admin/hash/findBetStatus`, params)
}

/**
 * 订单结果
 * @param {Object} params 参数
 * @returns Promise
 */
export async function findBetResult(params = {}) {
  return request.post(`/admin/hash/findBetResult`, params)
}
