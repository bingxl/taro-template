import '@tarojs/async-await';
import Taro, { Component } from '@tarojs/taro';
import { Provider } from '@tarojs/redux';
import { login } from '@utils/';
import { dispatchGetUserinfo } from '@actions/user';
import 'taro-ui/dist/style/index.scss';
import Home from './pages/home';

import configStore from './store';

import './app.scss';

const store = configStore();

class App extends Component {

  config = {
    pages: [
      'pages/home/home',
    ],
    /*
    tabBar: {
      color: '#a9a9a9',
      selectedColor: '#7ED321',
      backgroundColor: '#ffffff',
      custom: false,
      list: [
        {
          text: '首页',
          iconPath: './assets/tabbar/home.png',
          selectedIconPath: './assets/tabbar/home_active.png',
          pagePath: 'pages/home/home'
        },
      ]
    },
    */
    // 获取用户授权信息
    permission: {
      "scope.userLocation": {
        "desc": "您的位置信息将用于筛选您附近的农资店",
      }
    },

    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: '测试',
      navigationBarTextStyle: 'black'
    }
  }

  async componentDidMount () {
    const { params } = this.$router;

    // params.query 是启动小程序时传入的参数
    await login(params);

    // 更新用户信息
    await dispatchGetUserinfo()(store.dispatch);
  }

  componentDidShow () {}

  componentDidHide () {}

  componentCatchError () {}

  componentDidCatchError () {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Provider store={store}>
        <Home />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
