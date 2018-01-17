<template>
  <div class="ion-modal" :class="[modeClass, cssClass]" role="dialog" style="z-index: 10010;">
    <vm-backdrop :enableBackdropDismiss="enableBackdropDismiss"
                  v-if="showBackdrop"
                  v-show="isActive"
                  @click="bdClick"></vm-backdrop>
    <transition name="modal-fade"
        @before-enter="beforeEnter"
        @after-enter="afterEnter"
        @before-leave="beforeLeave"
        @after-leave="afterLeave">
      <div class="modal-wrapper" v-show="isActive">
        <div class="modal-viewport" ref="viewPort"></div>
      </div>
    </transition>
  </div>
</template>
<script>
import Vue from 'vue'
import {isFunction, isTrueProperty, isString, isObject} from '../../util/util'
import {urlChange} from '../../util/dom'
import objectAssign from 'object-assign'
import ModeMixins from '../../themes/theme.mixins'
import VmBackdrop from '../backdrop'

const NOOP = () => {}

export default {
  name: 'vm-modal',
  mixins: [ModeMixins],
  components: {
    VmBackdrop
  },
  data () {
    return {
      defaultOptions: {
        component: null,
        data: {},
        showBackdrop: true,
        enableBackdropDismiss: true,
        dismissOnPageChange: true,
        onDismiss: NOOP
      },

      component: null,
      data: {},

      showBackdrop: true,
      enableBackdropDismiss: true,
      dismissOnPageChange: true,
      cssClass: '',
      onDismiss: NOOP,

      dismissCallback: NOOP, // 关闭的回调
      presentCallback: NOOP, // 打开的回调

      isActive: false,
      enabled: false,
      unreg: null
    }
  },
  computed: {
    viewportEle () {
      return this.$refs.viewPort
    }
  },
  created () {
    if (this.dismissOnPageChange) {
      this.unreg = urlChange(() => {
        this.isActive && this.dismiss()
      })
    }
  },
  methods: {
    beforeEnter () {
      this.enabled = false // 不允许过渡中途操作
      this.$app && this.$app.setEnabled(false, 300)
    },
    afterEnter () {
      this.presentCallback()
      this.enabled = true
    },
    beforeLeave () {
      this.enabled = false
      this.$app && this.$app.setEnabled(false, 300)
    },
    afterLeave () {
      this.dismissCallback()
      this.$el.remove()
      this.enabled = true
    },
    present (options) {
      let _options = objectAssign({}, this.defaultOptions, options)
      this.cssClass = _options.cssClass
      this.showBackdrop = isTrueProperty(_options.showBackdrop)
      this.dismissOnPageChange = isTrueProperty(_options.dismissOnPageChange)
      this.enableBackdropDismiss = isTrueProperty(_options.enableBackdropDismiss)
      if (isFunction(_options.onDismiss)) {
        this.onDismiss = _options.onDismiss
      }

      this.isActive = true
      // Sync to sub component
      this.mountContent(_options.component, _options.data)
      return new Promise((resolve) => {
        this.presentCallback = resolve
      })
    },

    dismiss (data) {
      if (this.isActive) {
        this.isActive = false
        this.dismissOnPageChange && this.unReg && this.unReg()
        if (!this.enabled) {
          this.$nextTick(() => {
            this.dismissCallback()
            this.$el.remove()
            this.enabled = true
          })
        }
        isFunction(this.onDismiss) && this.onDismiss(data)
        return new Promise((resolve) => {
          this.dismissCallback = resolve
        })
      } else {
        return new Promise((resolve) => {
          resolve(data)
        })
      }
    },

    bdClick () {
      if (this.enableBackdropDismiss) {
        this.dismiss()
      }
    },
    mountContent (component, data) {
      let Content
      if (isString(component)) {
        Content = Vue.extend({template: '<div>' + component + '</div>'})
      } else if (isObject(component)) {
        Content = Vue.extend(component)
      }

      // eslint-disable-next-line no-new
      new Content({
        el: this.viewportEle,
        $data: data
      })
    }
  }
}
</script>

<style lang="scss">
  @import 'modal';
  @import 'modal.ios';
  @import 'modal.md';
  @import "../../transition/modal";
</style>
