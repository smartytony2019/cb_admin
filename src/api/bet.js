import request from '@/utils/request'

/** ****************
 * 注单管理
 * ****************/

/**
 * 登录
 * @param {Object} params 参数
 * @returns Promise
 */
export async function lottery(params = {}) {
  return request.post(`/admin/bet/findLotteryPage/${params.current}/${params.size}`, params)
}

/**
 * 获取抽奖记录
 * @param {Object} params 参数
 * @returns Promise
 */
export async function draw(params = {}) {
  return request.post(`/admin/bet/findLotteryPage/${params.current}/${params.size}`, params)
}

