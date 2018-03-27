<template>
  <div class="ion-modal" :class="[modeClass, cssClass]" role="dialog">
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
        <div v-if="theComponent" class="modal-viewport">
          <component :is="theComponent" v-bind="data"></component>
        </div>
        <div v-else class="modal-viewport" v-html="htmlComponent"></div>
      </div>
    </transition>
  </div>
</template>
<script type="text/javascript">
import {isFunction, isTrueProperty} from '../../util/util'
import {urlChange, prepareComponent} from '../../util/dom'
import objectAssign from 'object-assign'
import ModeMixins from '../../themes/theme.mixins'
import VmBackdrop from '../backdrop'

const NOOP = () => {}

export default {
  name: 'vm-modal',
  mixins: [ModeMixins],
  inheritAttrs: false, // 避免将传递过来属性显现在根节点上
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
      unreg: null,
      htmlComponent: '',
      theComponent: ''
    }
  },
  created () {
    let _options = objectAssign({}, this.defaultOptions, this.$options.$data)
    this.cssClass = _options.cssClass
    this.showBackdrop = isTrueProperty(_options.showBackdrop)
    this.dismissOnPageChange = isTrueProperty(_options.dismissOnPageChange)
    this.enableBackdropDismiss = isTrueProperty(_options.enableBackdropDismiss)
    this.component = _options.component
    this.data = _options.data
    if (isFunction(_options.onDismiss)) {
      this.onDismiss = _options.onDismiss
    }

    if (this.dismissOnPageChange) {
      this.unreg = urlChange(() => {
        this.isActive && this.dismiss()
      })
    }
  },
  mounted () {
    prepareComponent(this.component).then((component) => {
      this.theComponent = component
    }, () => {
      this.htmlComponent = this.component
    })
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
    present () {
      this.isActive = true
      return new Promise((resolve) => {
        this.presentCallback = resolve
      })
    },

    dismiss (data) {
      if (this.isActive) {
        this.isActive = false
        this.unReg && this.unReg()
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
