import Taro from '@tarojs/taro';
import { API_USER_LOGIN, API_GET_USERINFO } from '@constants/api';
import { getStorage, updateStorage, login } from '.';

const CODE_AUTH_EXPIRED = '600';

/**
 * 简易封装网络请求，将用户id封装，除了登录外每一个请求都添加id字段
 * @param {object} options - 请求参数
 * @param {string} options.url - 请求地址
 * @param {string} [options.method=GET] 请求方式
 * @param {boolean} [options.showToast=false]
 * @param {object} [options.payload] - 传送到请求地址的请求参数
 * @returns {Promise} - resolve with 请求获取到的数据
 */
export default async function fetch(options) {
  let { url, payload={}, method = 'GET', showToast = false } = options;
  let id = await getStorage('id');
  const header = {};
  if (method === 'POST') {
    header['content-type'] = 'application/json';
  }
  if (url !== API_USER_LOGIN && !id) {
    await login();
    id = await getStorage('id');
  }
  if (url !== API_USER_LOGIN && id) {
    console.log(id);
    payload.id = id;
  }



  return Taro.request({
    url,
    method,
    data: payload,
    header
  }).then(async (res) => {
    const { data } = res;
    console.log('res in request: ', res);
    if (url === API_USER_LOGIN) {
      await updateStorage({id: data.id});
    } else if (url === API_GET_USERINFO) {
      await updateStorage({ userType: data.userinfo.userType });
    }
    return data
  }).catch((err) => {
    const defaultMsg = err.code === CODE_AUTH_EXPIRED ? '登录失效' : '请求异常'
    if (showToast) {
      Taro.showToast({
        title: err && err.errorMsg || defaultMsg,
        icon: 'none'
      })
    }

    return Promise.reject({ message: defaultMsg, ...err })
  })
}
