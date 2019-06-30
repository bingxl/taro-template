import { GET_USERINFO, USER_LOGIN, USER_LOGOUT, GET_MATERIAL } from '@constants/user';

const INITIAL_STATE = {}

export default function user(state = INITIAL_STATE, action) {
  switch(action.type) {
    case GET_USERINFO: {
      const userinfo = action.payload.userinfo;

      const { province='', city='', district='' } = userinfo;
      userinfo.region = [province, city, district].join('-');
      return {
        ...state,
        ...userinfo,
        login: true
      }
    }
    case USER_LOGIN: {
      return { ...state }
    }
    case USER_LOGOUT: {
      return {
        ...INITIAL_STATE
      }
    }

    case GET_MATERIAL: {
      return {
        ...state,
        materials: action.payload.materials
      }
    }
    default:
      return state
  }
}
