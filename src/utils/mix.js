import Taro from '@tarojs/taro';
import { API_USER_LOGIN, API_PAYMENT } from '@constants/api';
import fetch from './request';

let id;
export function getStorage(key) {
    return Taro.getStorage({ key }).then(res => res.data).catch(() => '');
}

export function updateStorage(data = {}) {
    console.log('in updateStorage ', data)
    if (data.id) {
        id = data.id; // 在此文件中使用id
        return Taro.setStorageSync('id', id);
    } else if (data.userType) {
        return Taro.setStorageSync('userType', data.userType)
    }
}

/**
 * 登录处理
 * @returns {Promise} - 返回 fetch 调用。
 */
export async function login(params={}) {

    const code = await Taro.login().then(res => res.code);
    return fetch({
        url: API_USER_LOGIN,
        payload: { code, ...params }
    })
}

/**
 * 设置提示信息，返回promise
 * @param {string} [title=提示] - 提示信息
 * @param {object} [rest] - 直接传递到showToast的参数对象
 * @param {number} [rest.duration=1000] 提示存在的时间
 * @returns {Promise} 提示存在的时间到了之后resolve
 */
export function warning(title='提示', rest = { duration: 1000 }) {
    Taro.showToast({
        title,
        icon: 'none',
        ...rest
    });
    return new Promise((resolve) => {
        setTimeout(resolve, rest.duration);
    })
}

/**
 * 发起支付请求，需要先设置@constants/api.js中的API_PAYMENT接口地址
 * @param {object} payload - 后端支付接口参数
 * @param {string} payload.orderid - 订单id
 * @param {string} payload.price - 支付价格
 * @param {number} payload.amount - 提现时的金额
 * @param {string} payload.order_type - 订单类型 支付保证金 | 支付预付金 | 支付订单尾款
 * @returns {Promise} Taro.requestPayment()
 */
export async function payment(payload) {
    const data = await fetch({
        url: API_PAYMENT,
        method: 'POST',
        payload,
    }).catch(() => {
        warning('发生了错误');
        return Promise.reject('发生了错误');
    });
    if (!data.status) {
        await warning(data.message);
        return Promise.reject(data.message);
    }
    return Taro.requestPayment(data.data)
}

/**
 * 统一设置页面分享数据
 * @param {object} shareinfo 返回的分享信息
 */
export function setShare({title='农作业小程序', path, imageUrl}={}) {
    const shareMsg = {title, path, imageUrl};
    if (!path) {
        shareMsg.path = '/pages/home/home?from=' + id;
    }
    if (!imageUrl) {
        shareMsg.imageUrl = ''
    }
    console.log('in setShare function ', shareMsg)
    return shareMsg;
}
