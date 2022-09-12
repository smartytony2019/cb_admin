import request from '@/utils/request'

/** ****************
 * 彩票管理
 * ****************/

/**
 * 获取注单记录
 * @param {Object} params 参数
 * @returns Promise
 */
export async function getBet(params = {}) {
  return request.post(`/admin/lottery/findBetPage/${params.current}/${params.size}`, params)
}

/**
 * 获取游戏类目
 * @param {Object} params 参数
 * @returns Promise
 */
export async function getCategory(params = {}) {
  return request.post(`/admin/lottery/findCategory`, params)
}

/**
 * 获取游戏
 * @param {Object} params 参数
 * @returns Promise
 */
export async function getGame(params = {}) {
  return request.post(`/admin/lottery/findGame`, params)
}

/**
 * 获取玩法
 * @param {Object} params 参数
 * @returns Promise
 */
export async function getPlay(params = {}) {
  return request.post(`/admin/lottery/findPlay`, params)
}

