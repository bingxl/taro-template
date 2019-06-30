// 小程序首页
import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import * as actions from '@actions/user';
import { Loading } from '@components';
import { connect } from '@tarojs/redux';
import { warning, setShare } from '@utils/';

import './home.scss';
// import fetch from '@utils/request';

@connect(state => state.user, actions)
class Home extends Component {
  state = {
    loaded: false,
  }

  onShareAppMessage() {
    return setShare();
  }
  async componentDidShow() {
    this.setState({ loaded: true });
    warning("hello this is a warning test")
  }

  componentWillUnmount() {
    this.setState({ loaded: false });
  }


  render() {

    if (!this.state.loaded) {
      return <Loading />
    }

    return (
      <View>
        hello TARO
      </View>
    )

  }

}

export default Home;