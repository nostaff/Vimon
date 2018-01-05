<template>
    <div class="vm-pop-sheet" :class="[modeClass,{'vm-pop-sheet-visible':isVisible}]">
        <vm-backdrop :bdClick="bdClick" :enableBackdropDismiss="enableBackdropDismiss"
                  :isActive="isActive && showBackdrop"></vm-backdrop>
        <transition
                name="pop-sheet"
                @before-enter="beforeEnter"
                @after-enter="afterEnter"
                @before-leave="beforeLeave"
                @after-leave="afterLeave">
            <div class="sheet-wrapper" v-show="isActive" @touchmove="onTouchMoveHandler($event)">
                <div class="sheet-container">
                    <slot></slot>
                </div>
            </div>
        </transition>
    </div>
</template>
<script type="text/javascript">
  import { urlChange } from '../../util/dom'
  import ThemeMixins from '../../themes/theme.mixins'
  import VmBackdrop from '../backdrop/backdrop.vue'

  const NOOP = () => {}

  export default {
    name: 'vm-pop-sheet',
    mixins: [ThemeMixins],
    components: {
      VmBackdrop
    },
    props: {
      enableBackdropDismiss: {
        type: Boolean,
        default () { return true }
      },
      dismissOnPageChange: {
        type: Boolean,
        default () { return true }
      },
      showBackdrop: {
        type: Boolean,
        default: true
      }
    },
    data () {
      return {
        /**
         * @desc
         * ActionSheet State
         * 属性      | 描述             | 未开启 | 'Present动画'开始 | 'Present动画'结束 | 'Dismiss动画'开始 | 'Dismiss动画'结束 | 未开启
         * ----------|------------------|--------|-------------------|-------------------|-------------------|-------------------|--------
         * isActive  | 开启关闭状态     | false  | true              | true              | true              | false             | false
         * enabled   | 是否在过渡动画中 | true   | false             | true              | true              | false             | true
         * isVisible | 判断是否在可视区 | false  | true              | true              | true              | true              | false
         * @private
         * */
        isActive: false, // Sheet 开启关闭状态, 显示动画开启 -> 触发关闭dismiss
        isVisible: false, // 是否处在显示阶段, 显示动画开启 -> 关闭动画完全关闭
        enabled: true, // 是否在过渡态的状态判断，如果在动画中则为false (补漏的)

        // promise
        presentCallback: NOOP,
        dismissCallback: NOOP,

        unReg: null // 页面变化的解绑函数
      }
    },
    methods: {
      /**
       * ActionSheet Animate Hooks
       * @private
       * */
      beforeEnter () {
        this.enabled = false // 不允许过渡中途操作
        this.isVisible = true
        this.$app && this.$app.setEnabled(false, 400)
      },
      afterEnter () {
        this.presentCallback()
        this.focusOutActiveElement()
        let focusableEle = document.querySelector('button')
        if (focusableEle) {
          focusableEle.focus()
        }
        this.enabled = true
        this.isVisible = true
      },
      beforeLeave () {
        this.enabled = false
        this.isVisible = true
        this.$app && this.$app.setEnabled(false, 400)
      },
      afterLeave () {
        this.dismissCallback()
        this.enabled = true
        this.isVisible = false
      },

      /**
       * ActionSheet启动之前去除focus效果，因为存在键盘
       * @private
       * */
      focusOutActiveElement () {
        // only button？
        const activeElement = document.activeElement
        activeElement && activeElement.blur && activeElement.blur()
      },

      /**
       * @function bdClick
       * @description
       * 点击backdrop,关闭actionsheet
       * @private
       */
      bdClick () {
        if (this.enableBackdropDismiss) {
          this.dismiss()
        }
      },

      /**
       * @function click
       * @description
       * 点击下方按钮
       * @param {object} button Button Click Handler
       * @private
       */
      click (button) {
        let shouldDismiss = true
        if (button.handler) {
          // a handler has been provided, execute it
          if (button.handler() === false) {
            // if the return value of the handler is false then do not dismiss
            shouldDismiss = false
          }
        }

        // 当前不是在过渡动画中(dismissing中)，
        // 如果是在dismissing中，则意味着正在关闭，
        // 这里不必进行
        if (shouldDismiss) {
          this.dismiss()
        }
      },

      /**
       * @function present
       * @description
       * 打开ActionSheet
       * @returns {Promise}  结果返回Promise, 当动画完毕后执行resolved
       */
      present () {
        this.isActive = true
        return new Promise((resolve) => { this.presentCallback = resolve })
      },

      /**
       * @function dismiss
       * @description
       * 关闭ActionSheet, 如果组件还在动画中, 则执行dismiss没有动作
       * @return {Promise} 结果返回Promise, 当动画完毕后执行resolved
       * */
      dismiss () {
        if (!this.enabled) {
          return new Promise((resolve) => { resolve() })
        }
        if (this.isActive) {
          this.isActive = false // 动起来
          this.unReg && this.unReg()
          return new Promise((resolve) => { this.dismissCallback = resolve })
        } else {
          return new Promise((resolve) => { resolve() })
        }
      },

      onTouchMoveHandler ($event) {
        $event.preventDefault()
        $event.stopPropagation()
      }
    },
    created () {
      // mounted before data ready, so no need to judge the `dismissOnPageChange` value
      if (this.dismissOnPageChange) {
        this.unReg = urlChange(() => {
          this.isActive && this.dismiss()
        })
      }
    }
  }
</script>
<style lang="scss">
    @import "pop-sheet";
    @import "pop-sheet.ios";
    @import "pop-sheet.md";
</style>
