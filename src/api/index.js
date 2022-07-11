import request from '@/utils/request'

const member = {
  get: (params) => request.get(`/admin/member/findById/${params.id}`),
  getList: (params) => request.post(`/admin/member/findPage/${params.current}/${params.size}`, params)
}

const user = {
  get: (params) => request.get(`/admin/user/findById/${params.id}`),
  getList: (params) => request.post(`/admin/user/findPage/${params.current}/${params.size}`, params)
}

export default {
  member,
  user
}
