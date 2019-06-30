import Taro, { Component } from '@tarojs/taro'
import { View, WebView } from '@tarojs/components'

import './webview.scss'

export default class extends Component {
  config = {
    navigationBarTitleText: ''
  }

  url = ''
  title = ''

  componentWillMount() {
    this.url = decodeURIComponent(this.$router.params.url || '')
    this.title = decodeURIComponent(this.$router.params.title || '')
    Taro.setNavigationBarTitle({ title: this.title })
  }

  render () {
    return (
      <View className='webview'>
        <WebView src={this.url} />
      </View>
    )
  }
}
