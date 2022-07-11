import request from '@/utils/request'

export function get(params) {
  return request.get(`/admin/member/findById/${params.id}`)
}

export function getList(params) {
  return request.post(`/admin/member/findPage/${params.current}/${params.size}`, params)
}

