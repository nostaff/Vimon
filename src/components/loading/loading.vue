<template>
  <div class="ion-loading" :class="[modeClass, cssClass]" role="dialog">
    <vm-backdrop :enableBackdropDismiss="false" :isActive="isActive" v-if="showBackdrop"></vm-backdrop>
    <transition name="loading-fade"
          @before-enter="beforeEnter"
          @after-enter="afterEnter"
          @before-leave="beforeLeave"
          @after-leave="afterLeave">
      <div class="loading-wrapper" v-show="isActive">
        <div v-if="spinner" class="loading-spinner">
          <vm-spinner :name="spinner"></vm-spinner>
        </div>
        <div v-if="content" v-html="content" class="loading-content"></div>
      </div>
    </transition>
  </div>
</template>
<script type="text/javascript">
import { isTrueProperty } from '../../util/util'
import { urlChange } from '../../util/dom'
import objectAssign from 'object-assign'
import ModeMixins from '../../themes/theme.mixins'
import VmBackdrop from '../backdrop'
import VmSpinner from '../spinner'

const NOOP = () => {}

export default {
  name: 'vm-loading',
  mixins: [ModeMixins],
  components: {
    VmBackdrop,
    VmSpinner
  },
  data () {
    return {
      defaultOptions: {
        spinner: '',
        content: '',
        showBackdrop: true,
        dismissOnPageChange: true,
        scrollControl: false,
        duration: 3000,
        cssClass: ''
      },

      content: '',
      spinner: this.$config && this.$config.get('spinner', 'ios') || 'ios',

      showBackdrop: true,
      dismissOnPageChange: true,
      scrollControl: false,
      duration: 3000,
      cssClass: '',

      isActive: false,

      // promise
      presentCallback: NOOP,
      dismissCallback: NOOP
    }
  },
  created () {
    let _options = objectAssign({}, this.defaultOptions, this.$options.$data)
    this.content = _options.content
    if (_options.spinner) { this.spinner = _options.spinner }
    if (_options.spinner === 'hide') { this.spinner = null }
    this.cssClass = _options.cssClass.trim()
    this.duration = parseInt(_options.duration)
    this.showBackdrop = isTrueProperty(_options.showBackdrop)
    this.dismissOnPageChange = isTrueProperty(_options.dismissOnPageChange)
    this.scrollControl = isTrueProperty(_options.scrollControl)

    if (this.dismissOnPageChange) {
      this.unReg = urlChange(() => {
        this.isActive && this.dismiss()
      })
    }

    if (this.scrollControl) {
      this.$app && this.$app.disableScroll && this.$app.disableScroll()
    }
  },
  methods: {
    beforeEnter () {
      this.$app && this.$app.setEnabled(false, 200)
      this.enabled = false
    },
    afterEnter () {
      this.presentCallback()
      this.enabled = true
    },
    beforeLeave () {
      this.$app && this.$app.setEnabled(false, 200)
      this.enabled = false
    },
    afterLeave () {
      this.dismissCallback()
      this.$el.remove()
      this.enabled = true
    },
    present () {
      this.isActive = true
      if (parseInt(this.duration) > 16) {
        this.timer && window.clearTimeout(this.timer)
        this.timer = window.setTimeout(() => {
          this.dismiss()
        }, this.duration)
      }
      return new Promise((resolve) => { this.presentCallback = resolve })
    },

    dismiss () {
      if (this.isActive) {
        this.isActive = false // 动起来
        this.timer && window.clearTimeout(this.timer)
        this.unreg && this.unreg()
        return new Promise((resolve) => { this.dismissCallback = resolve })
      } else {
        return new Promise((resolve) => { resolve() })
      }
    }
  }
}
</script>

<style lang="scss">
@import "loading";
@import "loading.ios";
@import "loading.md";
@import "../../transition/loading";
</style>
