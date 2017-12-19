<template>
  <div role="dialog" :class="['ion-toast', modeClass, cssClass]" :style="{'z-index': zIndex}">
    <transition :name="'toast-fade-'+position"
        @before-enter="beforeEnter"
        @after-enter="afterEnter"
        @before-leave="beforeLeave"
        @after-leave="afterLeave">
      <div class="toast-wrapper" :class="['toast-'+position]" v-show="isActive">
        <div class="toast-container">
          <div class="toast-message" v-if="message">{{message}}</div>
          <vm-button class="toast-button" clear v-if="showCloseButton" @click="closeButtonClick()">{{closeButtonText}}</vm-button>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import {urlChange, focusOutActiveElement} from '../../util/dom'
import {isFunction, isNumber, isTrueProperty} from '../../util/util'
import objectAssign from 'object-assign'
import ModeMixins from '../../themes/theme.mixins'
import VmButton from '../button'

let zIndex = 20001
export default {
  name: 'vm-toast',
  mixins: [ModeMixins],
  components: {
    VmButton
  },
  data () {
    return {
      defaultOptions: {
        message: '',
        closeButtonText: 'OK',
        showCloseButton: false,
        dismissOnPageChange: true,
        duration: 3000,
        position: 'bottom', // "top", "middle", "bottom"
        cssClass: '',
        onDismiss: () => {}
      },

      message: '',
      closeButtonText: 'OK',
      showCloseButton: false,
      dismissOnPageChange: true,
      duration: 3000,
      position: 'bottom',
      cssClass: '',
      onDismiss: () => {},

      isActive: false,
      timer: null,

      zIndex: this.getZIndex()
    }
  },
  created () {
    if (this.dismissOnPageChange) {
      this.unReg = urlChange(() => {
        if (this.isActive) {
          if (this.showCloseButton) {
            this.closeButtonClick()
          } else if (this.timer) {
            window.clearTimeout(this.timer)
            this.timer = null
            this.dismiss()
          }
        }
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
    getZIndex () {
      return zIndex++
    },
    present (options) {
      let _options = objectAssign({}, this.defaultOptions, options)
      this.message = _options.message
      this.closeButtonText = _options.closeButtonText
      this.cssClass = _options.cssClass
      this.showCloseButton = isTrueProperty(_options.showCloseButton)
      this.dismissOnPageChange = isTrueProperty(_options.dismissOnPageChange)
      if (['top', 'middle', 'bottom'].indexOf(_options.position) > -1) {
        this.position = _options.position
      }
      if (isNumber(_options.duration)) {
        this.duration = _options.duration
      }
      if (isFunction(_options.onDismiss)) {
        this.onDismiss = _options.onDismiss
      }

      this.isActive = true
      if (!this.showCloseButton) {
        this.timer = window.setTimeout(() => {
          this.timer = null
          this.dismiss()
        }, this.duration)
      }

      this.isActive = true
      return new Promise((resolve) => {
        this.presentCallback = resolve
      })
    },

    dismiss () {
      if (this.isActive) {
        this.isActive = false
        this.onDismiss && this.onDismiss(role)

        this.dismissOnPageChange && this.unReg && this.unReg()
        if (!this.enabled) {
          this.$nextTick(() => {
            this.dismissCallback()
            this.$el.remove()
            this.enabled = true
          })
        }
        return new Promise((resolve) => {
          this.dismissCallback = resolve
        })
      } else {
        return new Promise((resolve) => {
          resolve()
        })
      }
    },

    closeButtonClick () {
      this.dismiss()
    }
  }
}
</script>

<style lang="scss">
  @import 'toast';
  @import 'toast.ios';
  @import 'toast.md';
  @import "../../transition/toast";
</style>
