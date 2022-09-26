import request from '@/utils/request'

/**
 * 查询
 * @param {Object} params 参数
 * @returns Promise
 */
export async function get(params = {}) {
  return request.get(`/admin/member/findById/${params.id}`)
}
/**
 * 查询
 * @param {Object} params 参数
 * @returns Promise
 */
export async function findByType(params = {}) {
  return request.post(`/admin/member/findByType`)
}

/**
 * 查询会员
 * @param {Object} params 参数
 * @returns Promise
 */
export async function findPage(params = {}) {
  return request.post(`/admin/member/findPage/${params.current}/${params.size}`, params)
}

/**
 * 查询会员流水
 * @param {Object} params 参数
 * @returns Promise
 */
export async function findFlowPage(params = {}) {
  return request.post(`/admin/member/findFlowPage/${params.current}/${params.size}`, params)
}

/**
 * 查询会员流水
 * @param {Object} params 参数
 * @returns Promise
 */
export async function findByFlowItem(params = {}) {
  return request.post(`/admin/member/findByFlowItem`, params)
}

/**
 * 查询会员记录
 * @param {Object} params 参数
 * @returns Promise
 */
export async function findRecordPage(params = {}) {
  return request.post(`/admin/member/findRecordPage/${params.current}/${params.size}`, params)
}

/**
 * 查询会员记录类型
 * @param {Object} params 参数
 * @returns Promise
 */
export async function findByRecordType(params = {}) {
  return request.post(`/admin/member/findByRecordType`, params)
}

