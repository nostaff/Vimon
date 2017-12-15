<template>
  <div class="ion-app" :version="version" :class="[modeClass,hoverClass,{'disable-scroll':isScrollDisabled}]">
    <div class="app-viewport"></div>
    <!--app-root start-->
    <div class="app-root">
      <slot></slot>
    </div>
    <div id="modal-portal"></div>
    <div id="sheet-portal"></div>
    <div id="alert-portal"></div>
    <div id="loading-portal"></div>
    <div id="toast-portal"></div>
    <!--当页面被点击的时候，防止在动画的过程中再次点击页面导致bug的蒙层，全局最高！z-index=99999-->
    <div class="click-block" :class="[{'click-block-enabled':isClickBlockEnabled}]"></div>
  </div>
</template>

<script type="text/javascript">
import { isString, isPresent } from '../../util/util'
import { setElementClass } from '../../util/dom'
import ModeMixins from '../../themes/theme.mixins'
import ClickBlock from './click-block'

const CLICK_BLOCK_BUFFER_IN_MILLIS = 64 // click_blcok等待时间
const CLICK_BLOCK_DURATION_IN_MILLIS = 700 // 时间过后回复可点击状态
const clickBlockInstance = new ClickBlock()

let scrollDisTimer = null // 计时器
export default {
  name: 'vm-app',
  mixins: [ModeMixins],
  provide () {
    let _this = this
    return {
      appComponent: _this
    }
  },
  data () {
    return {
      // ----------- App -----------
      disabledTimeRecord: 0, // 禁用计时
      scrollTimeRecord: 0, // 滚动计时
      isScrollDisabled: false, // 控制页面是否能滚动
      isClickBlockEnabled: false, // 控制是否激活 '冷冻'效果 click-block-enabled

      isScrolling: false, // 可滚动状态
      isEnabled: true, // 可点击状态

      version: isPresent(window.VM) && window.VM.version
    }
  },
  computed: {
    modeClass () {
      return `app-root app-root-${this.mode} ${this.mode} platform-${this.mode}`
    },
    hoverClass () {
      let _isMobile = navigator.userAgent.match(/AppleWebKit.*Mobile.*/)
      return _isMobile ? 'disable-hover' : 'enable-hover'
    }
  },
  created () {
    console.assert(this.$platform, `The Component of <App> need 'platform' instance`)
    console.assert(this.$config, `The Component of <App> need 'config' instance`)

    /**
       * $app对外方法
       **/
    let proto = Reflect.getPrototypeOf(Reflect.getPrototypeOf(this))
    proto.$app = this

    const _this = this
    this.$events.$on('onScrollStart', () => {
      _this.isScrolling = true
    })
    this.$events.$on('onScroll', () => {
      _this.isScrolling = true
    })
    this.$events.$on('onScrollEnd', () => {
      _this.isScrolling = false
    })

    // 设置当前可点击
    this.isClickBlockEnabled = true
  },
  mounted () {
    if (window.VM) {
      window.VM.$app = this
      // 用于判断组件是否在VM的组件树中
      window.VM.$events = this.$events
    }
  },
  methods: {
    /**
     * @function setEnabled
     * @description
     * 设置当前页面是否能点击滑动, 一般使用在像ActionSheet/Alert/Modal等弹出会出现transition动画,
     * 当transition动画进行中，页面是锁定的不能点击，因此使用该函数设定App的状态, 保证动画过程中, 用户不会操作页面
     * @param {boolean} isEnabled  - `true` for enabled, `false` for disabled
     * @param {number} duration - isEnabled=false的过期时间 当 `isEnabled` 设置为`false`, 则duration之后，`isEnabled`将自动设为`true`
     *
     * @example
     * this.$app && this.$app.setEnabled(false, 400) -> 400ms内页面不可点击, 400ms过后可正常使用
     * this.$app && this.$app.setEnabled(true) -> 64ms后解除锁定
     **/
    setEnabled (isEnabled, duration = CLICK_BLOCK_DURATION_IN_MILLIS) {
      this.disabledTimeRecord = isEnabled ? 0 : Date.now() + duration
      this.isEnabled = isEnabled
      if (isEnabled) {
        // disable the click block if it's enabled, or the duration is tiny
        clickBlockInstance
          .activate(false, CLICK_BLOCK_BUFFER_IN_MILLIS)
          .then(() => {
            this.isEnabled = true
          })
      } else {
        // show the click block for duration + some number
        clickBlockInstance
          .activate(true, duration + CLICK_BLOCK_BUFFER_IN_MILLIS)
          .then(() => {
            this.isEnabled = true
          })
      }
    },

    /**
       * @function setDisableScroll
       * @description
       * 是否点击滚动, 这个需要自己设置时间解锁
       * @param {Boolean} isScrollDisabled - 是否禁止滚动点击 true:禁止滚动/false:可以滚动
       * @param {number} duration - 时间过后则自动解锁
       * @example
       * this.$app && this.$app.setDisableScroll(true, 400) -> 400ms内页面不可滚动, 400ms过后可正常使用
       * this.$app && this.$app.setDisableScroll(false) ->立即解除锁定
       **/
    setDisableScroll (isScrollDisabled, duration = 0) {
      if (duration > 0 && isScrollDisabled) {
        this.isScrollDisabled = isScrollDisabled
        window.clearTimeout(scrollDisTimer)
        scrollDisTimer = window.setTimeout(() => {
          this.isScrollDisabled = false
        }, duration)
      }
    },

    /**
       * @function setClass
       * @description
       * 设置根组件的class样式, 比如全局颜色替换或者结构变更
       * @param {string} className - 样式名称
       * @param {boolean} [isAdd=false] - 是否添加
       */
    setClass (className, isAdd = false) {
      if (className) {
        setElementClass(this.$el, className, isAdd)
      }
    },

    /**
     * @function setDocTitle
     * @param {String|Object}  _title - 设置标题
     * @param {String}  _title.title - 标题
     * @description
     * 设置document.title的值, 如果传入的是string, 则为title的字符串, 如果是对象, 则title字段为标题名称
     **/
    setDocTitle (_title) {
      if (isString(_title)) {
        _title = { title: _title }
      }
      // BugFixed: 如果组件不是通过异步加载, 则他的执行顺序会很靠前, 此时平台的方法并未初始化完毕. 因此异步定时后在执行
      window.setTimeout(() => {
        let isHandled =
          !!this.$platform &&
          !!this.$platform.setNavbarTitle &&
          this.$platform.setNavbarTitle(_title)
        if (!isHandled) {
          if (this.$platform && this.$platform.platforms().length <= 2) {
            // PC端
            document.title = _title.title || ''
          } else {
            // 利用iframe的onload事件刷新页面
            document.title = _title.title
            let iframe = document.createElement('iframe')
            // 空白图片
            iframe.src = 'data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg=='
            iframe.style.visibility = 'hidden'
            iframe.style.width = '1px'
            iframe.style.height = '1px'
            iframe.onload = function () {
              window.setTimeout(function () {
                document.body.removeChild(iframe)
              }, 0)
            }
            document.body.appendChild(iframe)
          }
        }
      }, 16 * 5)
    }

  }
}
</script>

<style lang="scss">
@import "app";
@import "app.ios";
@import "app.md";

// Page Animate
@import "../../transition/app";
</style>
