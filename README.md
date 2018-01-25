<h1 align="center"><p align="center"><img src="https://nostaff.github.io/vimon/example/static/img/vimo.png" alt="vimo" width="200"></p><p align="center">Hello Vimon</p></h1>

<p align="center"><a href="https://www.travis-ci.org/nostaff/vimon"><img src="https://www.travis-ci.org/nostaff/vimon.svg?branch=master" alt="Build Status"></a> <a href='https://coveralls.io/github/nostaff/vimon?branch=master'><img src='https://img.shields.io/coveralls/nostaff/vimon.svg?branch=master' alt='Coverage Status' /></a> <a href="https://www.npmjs.com/package/vimon"><img src="https://img.shields.io/npm/v/vimon.svg" alt="npm version"></a> <a href="https://www.npmjs.com/package/vimon"><img src="https://img.shields.io/npm/dm/vimon.svg" alt="npm downloads"></a> <a href="https://standardjs.com"><img src="https://img.shields.io/badge/code_style-standard-brightgreen.svg" alt="standardjs"></a> <a href="#"><img src="https://img.shields.io/github/license/nostaff/Vimon.svg" alt="liense"></a> </p>

<h4 align="center"><p align="center">A H5 Platform For Hybrid</p></h4>


## DEMO

<p align="center"><img src="https://github.com/nostaff/vimon/blob/master/demos/static/img/qrcode.png?raw=true" alt="vimo" width="200"><br><a align="center" href="https://nostaff.github.io/vimon/example/">https://nostaff.github.io/vimon/example</a></p>

## USED FOR

使用一套H5代码在各类HyBrid平台中运行, 并根据平台完成对应的初始化工作, 且能根据平台自动切换主题样式.

本组件库很大一部分代码参照或移植了 <a href="https://github.com/vm-component/vimo">Vimo</a> 的代码，再次感谢Vimo作的分享。

可以使用的平台:  **微信、支付宝、钉钉、普通浏览器、原生App内部增强版WebView中**.

## HOW TO START

#### 安装

```
npm install vimon

```


#### 导入所有组件

```
import Vimon from 'vimon'
Vue.use(Vimon, {
  appConf: APP_CONFIGS,
  pltConf: PLATFORM_CONFIGS,
  router: router
})
```

#### 或 按需导入组件

```
// 平台基础安装
import { Core, App, Content, Footer, Header, Page, Navigation } from 'vimon'

Vue.use(Core, {
  appConf: APP_CONFIGS,
  pltConf: PLATFORM_CONFIGS,
  router: router
})

// 全局注册的组件(核心组件)
Vue.component(App.name, App)
Vue.component(Page.name, Page)
Vue.component(Header.name, Header)
Vue.component(Content.name, Content)
Vue.component(Footer.name, Footer)

// Directive
Vue.directive(Navigation.name, Navigation)
```

## DEPENDENT

- vue 2.x
- vue-router 2.x
- webpack 2.x
- fastclick 1.x
- vue-i18n
- standardJS
- swiper

## 内部目录


```
- ./components  源码组件
- ./lib js部分babel处理
- ./dist 组件全部打包
```

## LICENSE

MIT

