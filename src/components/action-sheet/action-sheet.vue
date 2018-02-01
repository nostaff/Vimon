<template>
  <div role="dialog" :class="['ion-action-sheet', modeClass, cssClass]" style="z-index: 10001;">
    <vm-backdrop
        @click="bdClick"
        :enableBackdropDismiss="enableBackdropDismiss"
        :isActive="isActive"></vm-backdrop>
    <transition name="action-sheet-fade"
        @before-enter="beforeEnter"
        @after-enter="afterEnter"
        @before-leave="beforeLeave"
        @after-leave="afterLeave">
      <div class="action-sheet-wrapper" v-show="isActive">
        <div class="action-sheet-container">
          <div class="action-sheet-group">
            <div class="action-sheet-title">
              <span>{{title}}</span>
              <div class="action-sheet-sub-title" v-if="subTitle">{{subTitle}}</div>
            </div>
            <vm-button role="action-sheet-button" :key="index" v-for="(button, index) in buttons" :disabled="button.disabled" :class="button.cssClass" @click="clickHandler(button)">
              <vm-icon class="action-sheet-icon icon" :name="button.icon" v-if="button.icon"></vm-icon>
              {{button.text}}
            </vm-button>
          </div>
          <div class="action-sheet-group">
            <vm-button role="action-sheet-button" class="action-sheet-cancel" :class="cancelButton.cssClass" :disabled="cancelButton.disabled" @click="clickHandler(cancelButton)">
              <vm-icon class="action-sheet-icon icon" :name="cancelButton.icon" v-if="cancelButton.icon"></vm-icon>
              {{cancelButton.text}}
            </vm-button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import {urlChange, focusOutActiveElement} from '../../util/dom'
import {isFunction, isTrueProperty, isString} from '../../util/util'
import objectAssign from 'object-assign'
import ModeMixins from '../../themes/theme.mixins'
import VmBackdrop from '../backdrop'
import VmButton from '../button'
import VmIcon from '../icon'

const NOOP = () => {}

export default {
  name: 'vm-action-sheet',
  mixins: [ModeMixins],
  components: {
    VmButton,
    VmBackdrop,
    VmIcon
  },
  data () {
    return {
      defaultOptions: {
        title: '',
        subTitle: '',
        cssClass: '',
        buttons: []
      },
      title: '',
      subTitle: '',
      cssClass: '',
      buttons: [],
      enableBackdropDismiss: true,
      dismissOnPageChange: true,

      dismissCallback: NOOP, // 关闭的回调
      presentCallback: NOOP, // 打开的回调

      cancelButton: {},
      isActive: false
    }
  },
  created () {
    let _options = objectAssign({}, this.defaultOptions, this.$options.$data)
    this.title = _options.title.trim()
    this.subTitle = _options.subTitle.trim()
    this.enableBackdropDismiss = isTrueProperty(_options.enableBackdropDismiss)
    this.dismissOnPageChange = isTrueProperty(_options.dismissOnPageChange)
    this.cssClass = _options.cssClass.trim()

    _options.buttons.forEach((button) => {
      if (isString(button)) {
        button = { text: button }
      }

      if (!button.cssClass) {
        button.cssClass = ''
      } else {
        button.cssClass = button.cssClass.trim()
      }

      if (button.role === 'cancel') {
        this.cancelButton = button
      } else {
        if (button.role === 'destructive') {
          button.cssClass = (button.cssClass + ' ' || '') + 'action-sheet-destructive'
        } else if (button.role === 'selected') {
          button.cssClass = (button.cssClass + ' ' || '') + 'action-sheet-selected'
        }
        this.buttons.push(button)
      }
    })

    if (this.dismissOnPageChange) {
      this.unreg = urlChange(() => {
        this.isActive && this.dismiss()
      })
    }
  },
  methods: {
    beforeEnter () {
      this.enabled = false // 不允许过渡中途操作
      this.$app && this.$app.setEnabled(false, 400)
    },
    afterEnter () {
      this.presentCallback()
      focusOutActiveElement()
      let focusableEle = document.querySelector('button')
      if (focusableEle) {
        focusableEle.focus()
      }
      this.enabled = true
    },
    beforeLeave () {
      this.enabled = false
      this.$app && this.$app.setEnabled(false, 400)
    },
    afterLeave () {
      this.dismissCallback()
      // 删除DOM
      this.$el.remove()
      this.enabled = true
    },
    /**
     * @function present
     * @description
     * 开启ActionSheet组件, 当开启动画过度完毕时触发 `Promise` 的 `resolve` 。
     * @param {object} options - 传入参数
     * @param {String} [options.title]                        - ActionSheet的标题
     * @param {string} [options.subTitle]                     - ActionSheet的副标题
     * @param {string} [options.cssClass]                     - 自定义样式
     * @param {Boolean} [options.enableBackdropDismiss=true]  - 允许点击backdrop关闭actionsheet
     * @param {Boolean} [options.dismissOnPageChange=true]    - 路由切换关闭组件
     * @param {Array} [options.buttons]                       - button数组，包含全部role
     * @param {Array} options.buttons.text                    - button显示文本
     * @param {Array} options.buttons.icon                    - button显示的icon的name, 具体参考Icon组件
     * @param {Array} options.buttons.role                    - 可以是cancel(关闭)/destructive(警告/删除)/null
     * @param {Array} options.buttons.handler                 - 默认是关闭组件
     * @param {Array} options.buttons.cssClass                - 自定义样式
     * @return {Promise}
     */
    present () {
      this.isActive = true
      return new Promise((resolve) => {
        this.presentCallback = resolve
      })
    },

    dismiss () {
      if (this.isActive) {
        this.isActive = false
        this.unReg && this.unReg()
        return new Promise((resolve) => {
          this.dismissCallback = resolve
        })
      } else {
        return new Promise((resolve) => {
          resolve()
        })
      }
    },

    /**
     * @function click
     * @description 点击下方按钮
     * @param {object} button Button Click Handler
     * @private
    */
    clickHandler (button) {
      if (!this.enabled) {
        return
      }
      let shouldDismiss = true
      if (isFunction(button.handler)) {
        // a handler has been provided, execute it
        if (button.handler() === false) {
          // if the return value of the handler is false then do not dismiss
          shouldDismiss = false
        }
      }

      // 当前不是在过渡动画中(dismissing中)，
      // 如果是在dismissing中，则意味着正在关闭，
      // 这里不必进行
      if (this.enabled && shouldDismiss) {
        this.dismiss()
      }
    },

    bdClick () {
      if (!this.enabled || !this.enableBackdropDismiss) return
      if (this.cancelButton) {
        this.clickHandler(this.cancelButton)
      } else {
        this.dismiss()
      }
    }
  }
}
</script>

<style lang="scss">
@import "action-sheet";
@import "action-sheet.ios";
@import "action-sheet.md";
@import "../../transition/action-sheet";
</style>
