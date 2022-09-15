import request from '@/utils/request'

/** ****************
 * 彩票管理
 * ****************/

/**
 * 币种
 * @param {Object} params 参数
 * @returns Promise
 */
export async function symbol(params = {}) {
  return request.post(`/admin/symbol`, params)
}

/**
 * 语言
 * @param {Object} params 参数
 * @returns Promise
 */
export async function language(params = {}) {
  return request.post(`/admin/language`, params)
}
