<template>
  <div class="ion-popover" :class="[modeClass, cssClass]" style="z-index: 9999;">
    <ion-backdrop
        :enableBackdropDismiss="enableBackdropDismiss"
        v-if="showBackdrop" v-show="activated" @click.native="bdClick()"></ion-backdrop>
    <transition name="popover-fade">
      <div class="popover-wrapper" v-show="activated">
        <div class="popover-arrow" ref="popoverArrow"></div>
        <div class="popover-content" ref="popoverContent">
          <div class="popover-viewport" ref="popoverViewport">
            <slot></slot>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
/**
 * @component Popover
 * @description
 *
 * ## 弹出层组件 / Popover提示框组件
 *
 * ### 简介
 *
 * 这个组件适用于对组件中某部分进行弹出提示, 比如:
 *
 * - 单词点击弹出翻译
 * - 点击按钮弹出可选择的操作(和Fab有点类似, 但是Popover可自定义程度高, 但是显示内容建议小于Modal组件)
 *
 * ### 传入模板的弹出层组件
 *
 * Popover的实现和Modal组件相似, 都需要传入`*.vue`模板文件, 具体事例参考usage
 *
 *
 * ### 子组件如何获取数据
 *
 * 在组件中使用: `this.$options.$data` 获取传入data. 例如Usage中的示例, 子组件获取data中的contentEle数据这样操作:
 *
 * ```
 * this.contentEle = this.$options.$data.contentEle
 * ```
 *
 *
 * @usage
 * import List from 'vimo/lib/list'
 * import { ListHeader, ItemGroup, Item, ItemSliding, ItemOptions, ItemDivider } from 'vimo/lib/item'
 * import Popover from 'vimo/lib/popover'
 * import TextTool from './textTool.vue'
 * export default{
 *  methods: {
 *    openSetting ($event) {
 *      Popover.present({
 *        ev: $event,                           // 事件
 *        component: TextTool,                  // 传入组件
 *        data: {
 *          contentEle: this.$refs.content.$el  // 传入数据, 内部通过`this.$options.$data`获取这个data
 *        }
 *      })
 *    },
 *    specialText ($event, text) {
 *      Popover.present({
 *        ev: $event,
 *        component: `<p style="padding:0 14px;" text-center>You choose the word of <strong>${text}</strong>.</p>`
 *      })
 *    }
 *  },
 *  components: {Popover, List, ListHeader, ItemGroup, Item, ItemSliding, ItemOptions, ItemDivider}
 * }
 *
 * @props {String} cssClass - 额外的样式
 * @props {mode} [mode='ios'] - 模式
 * @props {Boolean} [showBackdrop=true] - 是否显示backdrop
 * @props {Boolean} [enableBackdropDismiss=true] - 点击backdrop是否能关闭组件
 * @props {Boolean} [dismissOnPageChange=true] - 页面切换是否关闭组件, 默认关闭
 * @props {Function} [onDismiss] - 完全关闭时的回调
 *
 * @props {Object|String|Function|Promise} component - popover内部显示的vue组件, 是一个*.vue文件; 如果是String的话则为html字符串; 支持异步
 * @props {Object} data - 传给popover内部显示的vue组件的数据, 内部组件通过`this.$options.$data`获取
 * @props {Object|MouseEvent} ev - 点击元素的事件, $event, 这个值的传入可以计算popover放置的位置
 *
 * @demo #/popover
 */
import {isTrueProperty} from '../../util/util'
import {urlChange} from '../../util/dom'
import objectAssign from 'object-assign'
import ModeMixins from '../../themes/theme.mixins'
import IonBackdrop from '../backdrop'

const POPOVER_IOS_BODY_PADDING = 2
const POPOVER_MD_BODY_PADDING = 12

export default {
  name: 'ion-popover',
  mixins: [ModeMixins],
  components: {
    IonBackdrop
  },
  data () {
    return {
      defaultOptions: {
        showBackdrop: true,
        enableBackdropDismiss: true,
        cssClass: ''
      },

      ev: null,
      showBackdrop: true,
      enableBackdropDismiss: true,
      dismissOnPageChange: true,
      cssClass: '',

      activated: false
    }
  },

  created () {
    if (this.dismissOnPageChange) {
      urlChange(() => {
        this.activated && this.dismiss(-1)
      })
    }
  },

  updated () {
    this.activated && this.updatePositionView()
  },

  methods: {
    present (options) {
      let _options = objectAssign({}, this.defaultOptions, options)
      this.showBackdrop = isTrueProperty(_options.showBackdrop)
      this.dismissOnPageChange = isTrueProperty(_options.dismissOnPageChange)
      this.enableBackdropDismiss = isTrueProperty(_options.enableBackdropDismiss)
      this.cssClass = _options.cssClass
      this.ev = _options.ev

      this.activated = true

      return new Promise((resolve, reject) => {
        this.$on('onHideEvent', (res) => {
          resolve(res)
        })
      })
    },

    dismiss (role) {
      this.activated = false
      this.$emit('onHideEvent', role)

      setTimeout(() => {
        this.$el.remove()
      }, 200)
    },

    bdClick () {
      if (this.enableBackdropDismiss) {
        this.dismiss('backdrop')
      }
    },

    mdPositionView () {
      const nativeEle = this.$el
      const ev = this.ev

      let originY = 'top'
      let originX = 'left'

      // Popover content width and height
      let popoverEle = nativeEle.querySelector('.popover-content')
      let popoverDim = popoverEle.getBoundingClientRect()
      let popoverWidth = popoverDim.width
      let popoverHeight = popoverDim.height

      // Window body width and height
      let bodyWidth = document.documentElement.clientWidth
      let bodyHeight = document.documentElement.clientHeight

      // If ev was passed, use that for target element
      let targetDim = ev && ev.target && ev.target.getBoundingClientRect()

      let targetTop = (targetDim && 'top' in targetDim) ? targetDim.top : (bodyHeight / 2) - (popoverHeight / 2)
      let targetLeft = (targetDim && 'left' in targetDim) ? targetDim.left : (bodyWidth / 2) - (popoverWidth / 2)

      let targetHeight = targetDim && targetDim.height || 0

      let popoverCSS = {
        top: targetTop,
        left: targetLeft
      }

      // If the popover left is less than the padding it is off screen
      // to the left so adjust it, else if the width of the popover
      // exceeds the body width it is off screen to the right so adjust
      if (popoverCSS.left < POPOVER_MD_BODY_PADDING) {
        popoverCSS.left = POPOVER_MD_BODY_PADDING
      } else if (popoverWidth + POPOVER_MD_BODY_PADDING + popoverCSS.left > bodyWidth) {
        popoverCSS.left = bodyWidth - popoverWidth - POPOVER_MD_BODY_PADDING
        originX = 'right'
      }

      // If the popover when popped down stretches past bottom of screen,
      // make it pop up if there's room above
      if (targetTop + targetHeight + popoverHeight > bodyHeight && targetTop - popoverHeight > 0) {
        popoverCSS.top = targetTop - popoverHeight
        nativeEle.classList.add('popover-bottom')
        originY = 'bottom'
        // If there isn't room for it to pop up above the target cut it off
      } else if (targetTop + targetHeight + popoverHeight > bodyHeight) {
        popoverEle.style.bottom = POPOVER_MD_BODY_PADDING + 'px'
      }

      popoverEle.style.top = popoverCSS.top + 'px'
      popoverEle.style.left = popoverCSS.left + 'px';

      (popoverEle.style)[this.$platform.css.transformOrigin] = originY + ' ' + originX
    },

    iosPositionView () {
      const nativeEle = this.$el
      const ev = this.ev

      let originY = 'top'
      let originX = 'left'

      // Popover content width and height
      let popoverEle = nativeEle.querySelector('.popover-content')
      let popoverDim = popoverEle.getBoundingClientRect()
      let popoverWidth = popoverDim.width
      let popoverHeight = popoverDim.height

      // Window body width and height
      let bodyWidth = document.documentElement.clientWidth
      let bodyHeight = document.documentElement.clientHeight

      // If ev was passed, use that for target element
      let targetDim = ev && ev.target && ev.target.getBoundingClientRect()

      let targetTop = (targetDim && 'top' in targetDim) ? targetDim.top : (bodyHeight / 2) - (popoverHeight / 2)
      let targetLeft = (targetDim && 'left' in targetDim) ? targetDim.left : (bodyWidth / 2)
      let targetWidth = targetDim && targetDim.width || 0
      let targetHeight = targetDim && targetDim.height || 0

      // The arrow that shows above the popover on iOS
      var arrowEle = nativeEle.querySelector('.popover-arrow')
      let arrowDim = arrowEle.getBoundingClientRect()
      var arrowWidth = arrowDim.width
      var arrowHeight = arrowDim.height

      // If no ev was passed, hide the arrow
      if (!targetDim) {
        arrowEle.style.display = 'none'
      }

      let arrowCSS = {
        top: targetTop + targetHeight,
        left: targetLeft + (targetWidth / 2) - (arrowWidth / 2)
      }

      let popoverCSS = {
        top: targetTop + targetHeight + (arrowHeight - 1),
        left: targetLeft + (targetWidth / 2) - (popoverWidth / 2)
      }

      // If the popover left is less than the padding it is off screen
      // to the left so adjust it, else if the width of the popover
      // exceeds the body width it is off screen to the right so adjust
      if (popoverCSS.left < POPOVER_IOS_BODY_PADDING) {
        popoverCSS.left = POPOVER_IOS_BODY_PADDING
      } else if (popoverWidth + POPOVER_IOS_BODY_PADDING + popoverCSS.left > bodyWidth) {
        popoverCSS.left = bodyWidth - popoverWidth - POPOVER_IOS_BODY_PADDING
        originX = 'right'
      }

      // If the popover when popped down stretches past bottom of screen,
      // make it pop up if there's room above
      if (targetTop + targetHeight + popoverHeight > bodyHeight && targetTop - popoverHeight > 0) {
        arrowCSS.top = targetTop - (arrowHeight + 1)
        popoverCSS.top = targetTop - popoverHeight - (arrowHeight - 1)
        nativeEle.classList.add('popover-bottom')
        originY = 'bottom'
        // If there isn't room for it to pop up above the target cut it off
      } else if (targetTop + targetHeight + popoverHeight > bodyHeight) {
        popoverEle.style.bottom = POPOVER_IOS_BODY_PADDING + '%'
      }

      arrowEle.style.top = arrowCSS.top + 'px'
      arrowEle.style.left = arrowCSS.left + 'px'

      popoverEle.style.top = popoverCSS.top + 'px'
      popoverEle.style.left = popoverCSS.left + 'px';

      (popoverEle.style)[this.$platform.css.transformOrigin] = originY + ' ' + originX
    },

    updatePositionView () {
      if (this.mode === 'ios') {
        this.iosPositionView()
      } else {
        this.mdPositionView()
      }
    }
  }
}
</script>

<style lang="scss">
  @import 'popover';
  @import 'popover.ios';
  @import 'popover.md';
  @import "../../transition/popover";
</style>
