<template>
  <vm-toolbar :color="color" v-show="!hideNavbar">
    <vm-button slot="buttons" v-if="isShowBackButton"
        :class="['back-button','back-button-'+mode,'show-back-button']"
        :icon-only="!backButtonText || mode !=='ios'"
        @click="backButtonClickHandler" >
      <vm-icon v-if="backButtonIcon"
          :class="['back-button-icon','back-button-icon-'+mode]"
          :name="backButtonIcon"></vm-icon>
      <span v-if="backButtonText && mode ==='ios'"
          :class="['back-button-text','back-button-text-'+mode]">{{backButtonText}}</span>
    </vm-button>

    <slot>
      <vm-title v-if="title">{{title}}</vm-title>
    </slot>

    <!--  定义navbar中slot的name，同时指定其为toolbar组件的slot -->
    <slot name="buttons" slot="buttons">
      <vm-buttons end v-if="showMoreButton">
        <vm-button @click="moreButtonClickHandler" :icon-only="!moreButtonText">
          <vm-icon :class="['more-button-icon','more-button-icon-'+mode]" :name="moreButtonIcon" v-if="moreButtonIcon"></vm-icon>
          <span :class="['more-button-text','more-button-text-'+mode]" v-if="moreButtonText" v-text="moreButtonText"></span>
        </vm-button>
      </vm-buttons>
    </slot>
  </vm-toolbar>
</template>

<script type="text/javascript">
import { isTrueProperty, isFunction, isArray, isString } from '../../util/util'
import ModeMixins from '../../themes/theme.mixins'
import VmToolbar from '../toolbar'
import VmButtons from '../buttons'
import VmIcon from '../icon'
import VmTitle from '../title'
import VmButton from '../button'

export default {
  name: 'vm-navbar',
  mixins: [ModeMixins],
  components: {
    VmToolbar,
    VmButtons,
    VmButton,
    VmTitle,
    VmIcon
  },
  provide () {
    const _this = this
    return {
      navbarComponent: _this
    }
  },
  data () {
    return {
      isShowBackButton: !isTrueProperty(this.hideBackButton),
      toolbarBackgroundColor: ''
    }
  },
  props: {
    title: String,
    hideNavbar: {
      type: Boolean,
      default: (this.$config && this.$config.getBoolean('hideNavbar', false)) || false
    },

    hideBackButton: {
      type: Boolean,
      default: false
    },
    backButtonIcon: {
      type: String,
      default: (this.$config && this.$config.get('backButtonIcon', 'arrow-back')) || 'arrow-back'
    },
    backButtonText: {
      type: String,
      default: (this.$config && this.$config.get('backButtonText', 'Back')) || 'Back'
    },
    onBackButtonClick: Function,

    showMoreButton: {
      type: Boolean,
      default: false
    },
    moreButtonIcon: {
      type: String,
      default: 'more'
    },
    moreButtonText: {
      type: String,
      default: ''
    },
    onMoreButtonClick: Function
  },
  created () {
    this._initWhenInWebview()
  },
  mounted () {
    this.refreshBackButtonStatus()
  },
  methods: {
    /**
     * @function showOptionButton
     * @description
     * 设置导航条右侧按钮显示(只是对alipay平台的), dingtalk通过url改变
     */
    showOptionButton () {
      this.$platform.showNavbarOptionButton && this.$platform.showNavbarOptionButton()
    },
    /**
     * @function hideOptionButton
     * @description
     * 设置导航条右侧按钮隐藏(只是对alipay平台的), dingtalk通过url改变
     */
    hideOptionButton () {
      this.$platform.hideNavbarOptionButton && this.$platform.hideNavbarOptionButton()
    },
    /**
     * @function showPopMenu
     * @description
     * 设置右侧弹出的按钮菜单, 右侧可以没有按钮, 但是pop固定在右上角
     * @param {Array} dataList                - menu的数据数组
     * @param {String} dataList.title         - 标题
     * @param {String} dataList.icon          - 标题左边的icon(建议使用https下的图片链接, 而不是本地图片. 可以使用base64格式的图片)
     * @param {String} dataList.badge         - 右上角徽章
     * @param {Function} dataList.handler     - 点击的处理函数
     * @return {Promise}
     * @example
     * this.navbarComponent.showPopMenu([
     *    {
     *       title: '周边美食',
     *       icon: 'https://zos.alipayobjects.com/rmsportal/mzorSIxVEdkTuxumzzau.png',
     *       badge: '-1',
     *       handler () {
     *         console.log('index:0 选择了: 周边美食')
     *       }
     *     },
     *     {
     *       title: '购物攻略',
     *       icon: 'https://zos.alipayobjects.com/rmsportal/UoBNIZJosEXNQtAxCEUg.png',
     *       badge: '100',
     *       handler () {
     *         console.log('index:1 选择了: 购物攻略')
     *       }
     *     },
     *     {
     *       title: '摄影技巧',
     *       icon: 'https://zos.alipayobjects.com/rmsportal/QJeWMNUFFiDCQawMLPTr.png',
     *       badge: '12',
     *       handler () {
     *         console.log('index:2 选择了: 摄影技巧')
     *       }
     *     },
     *     {
     *       title: '搞笑段子',
     *       icon: 'data:image/png;base64,iVBORw0K...YII=',
     *       badge: '0',
     *       handler () {
     *         console.log('index:3 选择了: 搞笑段子')
     *       }
     *     }
     * ])
     */
    showPopMenu (dataList) {
      let tmps = []
      if (dataList && isArray(dataList)) {
        dataList.forEach((item) => {
          if (isString(item)) {
            // ['菜单一', '菜单二', '菜单三']
            tmps.push({
              title: item
            })
          } else {
            // [{title:'1'}, {title:'2'}, {title:'3'},]
            tmps.push(item)
          }
        })
      }

      return new Promise((resolve, reject) => {
        let isHandled = this.$platform.showNavbarPopMenu && this.$platform.showNavbarPopMenu(tmps)

        // 显示navbar最右侧的按钮
        if (isHandled) {
          resolve()
        } else {
          try {
            /* eslint-disable-next-line no-err */
            import('../popover/index.js').then(
              // resolve
              (component) => {
                let Popover = component.default
                Popover.present({
                  ev: {
                    target: window.document.getElementById('right-button-placeholder') || null
                  }, // 事件
                  cssClass: 'popMenu',
                  component: import('./menu-options.vue'), // 传入组件
                  data: {
                    menusData: tmps // 传入数据, 内部通过`this.$attrs.data`获取这个data
                  }
                }).then(() => { resolve() })
              },
              // reject
              (err) => {
                reject(err)
              })
          } catch (err) {
            reject(err)
          }
        }
      })
    },
    /**
     * @function reset
     * @description
     * 重置之前的样式设置
     */
    reset () {
      this.$platform.resetNavbarTitleAndColor && this.$platform.resetNavbarTitleAndColor()
      this.$platform.resetNavbarOptionButton && this.$platform.resetNavbarOptionButton()
    },
    backButtonClickHandler (ev) {
      ev.preventDefault()
      ev.stopPropagation()

      if (isFunction(this.onBackButtonClick)) {
        if (this.onBackButtonClick(ev) === false) { return }
      }

      this.$router ? this.$router.back() : window.history.back()
    },
    moreButtonClickHandler (ev) {
      ev.preventDefault()
      ev.stopPropagation()

      if (isFunction(this.onMoreButtonClick)) {
        this.onMoreButtonClick(ev)
      }
    },
    /**
     * 手动设置是否显示后退按钮
     * @private
     */
    refreshBackButtonStatus () {
      this.isShowBackButton = this.$history.canGoBack() && !isTrueProperty(this.hideBackButton)
    },
    /**
     * 如果运行在webview中(alipay/dingtalk), 则执行修改navbar的初始化工作
     * @private
     */
    _initWhenInWebview () {
      if (this.$platform.platforms().length < 3) return
      // 如果在平台中则进行下面的分支
      this.$platform.ready().then(() => {
        /**
         * 初始化Navbar右侧的按钮组
         * 如果在webview中则提取template中的按钮信息, 写给webview.
         */
        this.$platform.setNavbarOptionButton && this.$platform.setNavbarOptionButton(this.$slots.buttons)
        /**
         * 初始化webview中Navbar的背景和底部边框, 只处理具有颜色class的情况
         * 只支持alipay, 不支持dingtalk, 因为dingtalk是通过url修改标题颜色的.
         */
        if (this.$platform.is('alipay')) {
          if (this.color) {
            // 1. 获取背景色
            let toolbarBackgroundElement = this.toolbarBackgroundElement
            if (!toolbarBackgroundElement) return
            var rgb = window.getComputedStyle(toolbarBackgroundElement).backgroundColor
            // "rgb(56, 126, 245)"
            // "rgba(56, 126, 245,0.8)"
            if (!rgb) return
            rgb = rgb.replace('rgb(', '')
            rgb = rgb.replace('rgba(', '')
            rgb = rgb.replace(')', '')
            rgb = rgb.split(',').map(val => val.trim())
            let r = parseInt(rgb[0]).toString(16).toUpperCase()
            let g = parseInt(rgb[1]).toString(16).toUpperCase()
            let b = parseInt(rgb[2]).toString(16).toUpperCase()
            // let a = rgb[3] ? parseInt(rgb[3]).toString(16) : 'FF'
            let backgroundColor = `#${r}${g}${b}`
            this.$platform.setNavbarBackgroundColor && this.$platform.setNavbarBackgroundColor(backgroundColor)
          } else {
            this.$platform.resetNavbarTitleAndColor && this.$platform.resetNavbarTitleAndColor()
          }
        }
      })
    }
  }
}
</script>
