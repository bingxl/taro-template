import { GET_MATERIAL, GET_USERINFO, USER_LOGOUT } from '@constants/user'
import { API_GET_MATERIAL, API_GET_USERINFO } from '@constants/api'
import { createAction } from '@utils/redux'

/**
 * 获取用户信息
 * @param {*} payload
 */

export const dispatchGetUserinfo = payload => createAction({
  url: API_GET_USERINFO,
  type: GET_USERINFO,
  payload
})

export const dispatchGetMaterial = payload => createAction({
  url: API_GET_MATERIAL,
  type: GET_MATERIAL,
  payload
})
/**
 * 用户退出登录
 */
export const dispatchLogout = () => ({ type: USER_LOGOUT })
