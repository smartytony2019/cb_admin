import request from '@/utils/request'

/**
 * 会员管理
 */
const member = {
  get: (params = {}) => request.get(`/admin/member/findById/${params.id}`),
  getList: (params = {}) => request.post(`/admin/member/findPage/${params.current}/${params.size}`, params)
}

/**
 * 会员流水管理
 */
const memberFlow = {
  getList: (params) => request.post(`/admin/memberFlow/findPage/${params.current}/${params.size}`, params)
}

/**
 * 用户管理
 */
const user = {
  login: (params = {}) => request.post(`/admin/user/login`, params),
  logout: (params = {}) => request.post(`/admin/user/logout`, params),
  get: (params = {}) => request.post(`/admin/user/find`, params),
  getList: (params = {}) => request.post(`/admin/user/findPage/${params.current}/${params.size}`, params)
}

const bet = {
  lottery: (params = {}) => request.post(`/admin/bet/findLotteryPage/${params.current}/${params.size}`, params),
  draw: (params = {}) => request.post(`/admin/bet/findLotteryPage/${params.current}/${params.size}`, params)
}

/**
 * 注单管理
 */
const lottery = {
  getBet: (params = {}) => request.post(`/admin/lottery/findBetPage/${params.current}/${params.size}`, params),
  getCategory: (params = {}) => request.post(`/admin/lottery/findCategory`, params),
  getGame: (params = {}) => request.post(`/admin/lottery/findGame`, params),
  getPlay: (params = {}) => request.post(`/admin/lottery/findPlay`, params)
}

export default {
  member,
  memberFlow,
  user,
  bet,
  lottery
}
