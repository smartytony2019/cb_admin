import request from '@/utils/request'

export function get(params) {
  return request.get(`/admin/user/findById/${params.id}`)
}

export function login(params) {
  return request.post(`/admin/user/login`, params)
}

export function getInfo(token) {
  return request.post(`/admin/user/info`, {})
}

export function logout() {
  return request.post(`/admin/user/logout`, {})
}

export function getUserList(params) {
  return request.post(`/admin/user/findPage/${params.current}/${params.size}`, params)
}

