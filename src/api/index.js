import request from '@/utils/request'

const member = {
  get: (params) => request.get(`/admin/member/findById/${params.id}`),
  getList: (params) => request.post(`/admin/member/findPage/${params.current}/${params.size}`, params)
}

const memberFlow = {
  getList: (params) => request.post(`/admin/memberFlow/findPage/${params.current}/${params.size}`, params)
}

const user = {
  login: (params) => request.post(`/admin/user/login`, params),
  logout: () => request.post(`/admin/user/logout`, {}),
  get: () => request.post(`/admin/user/find`, {}),
  getList: (params) => request.post(`/admin/user/findPage/${params.current}/${params.size}`, params)
}

const bet = {
  getList: (params) => request.post(`/admin/bet/findPage/${params.current}/${params.size}`, params)
}

export default {
  member,
  memberFlow,
  user,
  bet
}
