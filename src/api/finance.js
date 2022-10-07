import request from '@/utils/request'

/** ****************
 * 财务管理
 * ****************/

/**
 * 查询分页
 * @param {Object} params 参数
 * @returns Promise
 */
export async function findPage(params = {}) {
  return request.post(`/admin/finance/findPage/${params.current}/${params.size}`, params)
}

/**
 * 查询审计分页
 * @param {Object} params 参数
 * @returns Promise
 */
export async function findAuditPage(params = {}) {
  return request.post(`/admin/finance/findAuditPage/${params.current}/${params.size}`, params)
}
