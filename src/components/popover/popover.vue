<template>
  <div class="ion-popover" :class="[modeClass, colorClass, cssClass]" style="z-index: 9999;">
    <vm-backdrop
        :enableBackdropDismiss="enableBackdropDismiss"
        v-if="showBackdrop" v-show="isActive" @click="bdClick"></vm-backdrop>
    <transition name="popover-fade"
        @before-enter="beforeEnter"
        @after-enter="afterEnter"
        @before-leave="beforeLeave"
        @after-leave="afterLeave">
      <div class="popover-wrapper" v-show="isActive">
        <div class="popover-arrow" ref="popoverArrow"></div>
        <div class="popover-content" ref="popoverContent">
          <div v-if="theComponent" class="popover-viewport">
            <component :is="theComponent" :data="data"></component>
          </div>
          <div v-else class="popover-viewport" v-html="htmlComponent"></div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script type="text/javascript">
import {isTrueProperty} from '../../util/util'
import {urlChange, prepareComponent} from '../../util/dom'
import objectAssign from 'object-assign'
import ModeMixins from '../../themes/theme.mixins'
import VmBackdrop from '../backdrop'

const POPOVER_IOS_BODY_PADDING = 2
const POPOVER_MD_BODY_PADDING = 12
const NOOP = () => {}

export default {
  name: 'vm-popover',
  mixins: [ModeMixins],
  components: {
    VmBackdrop
  },
  data () {
    return {
      defaultOptions: {
        ev: null,
        showBackdrop: true,
        enableBackdropDismiss: true,
        dismissOnPageChange: true,
        onDismiss: NOOP,
        cssClass: '',
        component: null, // content component or string
        data: null // datas send to content
      },

      ev: null,
      showBackdrop: true,
      enableBackdropDismiss: true,
      dismissOnPageChange: true,
      onDismiss: NOOP,
      cssClass: '',
      component: null,
      data: null,

      dismissCallback: NOOP, // 关闭的回调
      presentCallback: NOOP, // 打开的回调

      isActive: false,
      enabled: false,
      unreg: null,
      htmlComponent: '',
      theComponent: ''
    }
  },
  computed: {
    popoverEle () {
      return this.$refs.popoverContent
    },
    arrowEle () {
      return this.$refs.popoverArrow
    }
  },
  created () {
    let _options = objectAssign({}, this.defaultOptions, this.$options.$data)
    this.showBackdrop = isTrueProperty(_options.showBackdrop)
    this.dismissOnPageChange = isTrueProperty(_options.dismissOnPageChange)
    this.enableBackdropDismiss = isTrueProperty(_options.enableBackdropDismiss)
    this.onDismiss = _options.onDismiss
    this.cssClass = _options.cssClass
    this.ev = _options.ev
    this.component = _options.component
    this.data = _options.data

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
  updated () {
    this.isActive && this.updatePositionView()
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
      this.onDismiss && this.onDismiss()

      this.$el.remove()
      this.enabled = true
    },
    present () {
      this.isActive = true

      return new Promise((resolve) => { this.presentCallback = resolve })
    },
    dismiss () {
      if (this.isActive) {
        this.isActive = false
        this.unreg && this.unreg()
        return new Promise((resolve) => { this.dismissCallback = resolve })
      } else {
        return new Promise((resolve) => { resolve() })
      }
    },

    bdClick () {
      if (this.enabled && this.enableBackdropDismiss) {
        this.dismiss()
      }
    },

    mdPositionView () {
      const nativeEle = this.$el
      const ev = this.ev

      let originY = 'top'
      let originX = 'left'

      // Popover content width and height
      let popoverEle = this.popoverEle
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
      let popoverEle = this.popoverEle
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
      var arrowEle = this.arrowEle
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
