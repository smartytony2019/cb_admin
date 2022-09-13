import request from '@/utils/request'

/**
 * 转换
 * @param {Object} params 参数
 * @returns Promise
 */
// export async function get(params = {}) {
//   return request.get(`/admin/member/findById/${params.id}`)
// }

export async function getList(params = {}) {
  return request.post(`/admin/member/findPage/${params.current}/${params.size}`, params)
}

export async function getFlowList(params = {}) {
  return request.post(`/admin/member/findFlowPage/${params.current}/${params.size}`, params)
}
