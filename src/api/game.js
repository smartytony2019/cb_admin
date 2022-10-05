import request from '@/utils/request'

/** ****************
 * 彩票管理
 * ****************/

/**
 * 查找类目
 * @param {Object} params 参数
 * @returns Promise
 */
export async function findCategory(params = {}) {
  return request.post(`/admin/game/findCategory`, params)
}

/**
 * 游戏列表
 * @param {Object} params 参数
 * @returns Promise
 */
export async function findPage(params = {}) {
  return request.post(`/admin/game/findPage/${params.current}/${params.size}`, params)
}

/**
 * 游戏更新
 * @param {Object} params 参数
 * @returns Promise
 */
export async function update(params = {}) {
  return request.post(`/admin/game/update`, params)
}
