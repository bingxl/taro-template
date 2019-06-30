/**
 * file: 定义所有用的的接口地址； 变量名同意使用API_开头
 */

 /* eslint-disable */
const devHost = 'http://bingxl.cn:3000/mock/9/'; // mock接口
const proHost = 'http://farminternal.wemiracle.com/index.php?s='; // 米乐扣测试接口
const local = 'http://localhost/farmer-order/index.php?s=';
 // process.env.NODE_ENV 在 config/dev.js 和 config/prod.js 中设置
 export const HOST = proHost;

 /* eslint-enable */

// 用户登陆接口
export const API_USER_LOGIN = `${HOST}user/login`;

export const API_GET_USERINFO = `${HOST}user/getInfo`;