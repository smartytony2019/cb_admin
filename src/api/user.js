import request from '@/utils/request'

/**
 * 登录
 * @param {Object} params 参数
 * @returns Promise
 */
export async function login(params = {}) {
  return request.post(`/admin/user/login`, params)
}

export async function logout(params = {}) {
  return request.post(`/admin/user/logout`, params)
}

export async function get(params = {}) {
  return request.post(`/admin/user/find`, params)
}

export async function getList(params = {}) {
  return request.post(`/admin/user/findPage/${params.current}/${params.size}`, params)
}
