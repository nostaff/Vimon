import Vue from 'vue'
import AppRoot from './App.vue'
import AttachFastClick from 'fastclick'
import APP_CONFIGS from './config/app-configs'
import PLATFORM_CONFIGS from './config/platform-configs'
// import vmGeo from 'vm-geo'
import router from './router'

// 导入所有组件
/*
import Vimo from 'vimo';
Vue.use(Vimo);
*/

// 按需导入组件
// 平台基础安装
import Vimo from 'vimo/core'
Vue.use(Vimo, {
  custConf: APP_CONFIGS,
  pltConf: PLATFORM_CONFIGS,
  router: router
})

import { App, Content, Footer, Header, Page } from 'vimo'

// 全局注册的组件(核心组件)
Vue.component(App.name, App)
Vue.component(Page.name, Page)
Vue.component(Header.name, Header)
Vue.component(Content.name, Content)
Vue.component(Footer.name, Footer)
// Vue.component(Button.name, Button)
// Vue.component(Toolbar.name, Toolbar)
// Vue.component(Buttons.name, Buttons)
// Vue.component(Title.name, Title)


// Vue.use(vmGeo, {
//   enableHighAccuracy: true, // 是否要求高精度地理位置信息
//   maximumAge: 10000,         // 设置缓存时间为1s，1s后重新获取地理位置信息
//   timeout: 15000,            // 5s未返回信息则返回错误
//   fallBack: 'aMap',         // 条件允许优先使用原生获取, 如果在IOS下是使用的是HTTP获取, 则使用备选, 这里是aMap
//   qMap: {
//     key: 'OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77', // official example app key, please use geo.register() to replace
//     name: 'qqMapName'
//   },
//   bMap: {
//     key: 'yFKaMEQnAYc1hA0AKaNyHGd4HTQgTNvO'
//   },
//   aMap: {
//     key: '8d1ba642a3a3046d1ee087e0f8b490a2'
//   }
// })

// eslint-disable-next-line no-new
new AttachFastClick(document.body)
// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  router,
  template: '<AppRoot/>',
  created () {
    this.$platform.ready().then((data) => {
      console.log(`Platform Ready && Init Info: ${data}`)
      // alert(`Platform Ready && Init Info: ${data}`)
    }, (data) => {
      console.error(`Platform Ready && Init Info: ${data}`)
      // alert(`Platform Ready && Init Info: ${data}`)
    })

    window.setTimeout(() => {
      // alert(`window.WebViewJavascriptBridge: ${JSON.stringify(Object.keys(window.WebViewJavascriptBridge))}`)
    }, 1000)
  },
  components: {AppRoot}
})
