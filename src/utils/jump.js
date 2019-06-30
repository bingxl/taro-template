import Taro from '@tarojs/taro'

const PAGE_WEBVIEW = '/pages/webview/webview'

/**
 * 页面跳转，可以跳转到小程序内的页面 也可以跳转到 H5 页面
 * @param {Object} options - 传入参数
 * @param {string} options.url - 跳转地址
 * @param {string} [otpions.title] - 目标页面的title标题（只对H5页面有效）
 * @param {string} [options.method=navigateTo] - 页面跳转方式
 * @param {object} [options.payload] - 传递给跳转页面你的参数
 */
export default async function jump(options) {
  const { url='', title = '', payload = {}, method = 'navigateTo' } = options;
  // userType 在获取用户信息的reduces里设置；
  if (/^https?:\/\//.test(url)) {
    Taro[method]({
      url: urlStringify(PAGE_WEBVIEW, { url, title })
    })
  } else if (/^\/pages\//.test(url)) {
    Taro[method]({
      url: urlStringify(url, payload)
    })
  }
}

/**
 *
 * @param {string} url - url基础部分
 * @param {object} [payload] - url参数列表
 * @param {boolean} [encode=true] - 是否对参数值进行encodeURIComponent编码
 * @return {string} - 带参数的url
 */
function urlStringify(url, payload, encode = true) {
  const arr = Object.keys(payload).map(key =>
    `${key}=${encode ? encodeURIComponent(payload[key]) : payload[key]}`
  )

  // NOTE 注意支付宝小程序跳转链接如果没有参数，就不要带上 ?，否则可能无法跳转
  return arr.length ? `${url}?${arr.join('&')}` : url
}
