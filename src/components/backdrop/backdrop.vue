<template>
  <transition name="backdrop-fade">
    <div class="ion-backdrop" :class="{'backdrop-no-tappable': !isEnableBackdropDismiss}" role="presentation" v-show="activated"></div>
  </transition>
</template>

<script>
import { isTrueProperty, timeout } from '../../util/util'
import ModeMixins from '../../themes/theme.mixins'

const preventDefault = e => {
  e.preventDefault()
}

export default {
  name: 'vm-backdrop',
  mixins: [ModeMixins],

  data () {
    return {
      activated: isTrueProperty(this.isActive),
      isEnableBackdropDismiss: isTrueProperty(this.enableBackdropDismiss)
    }
  },
  props: {
    isActive: {
      type: [Boolean, String],
      default: false
    },
    enableBackdropDismiss: {
      type: [Boolean, String],
      default: true
    }
  },
  watch: {
    isActive (val) {
      this.activated = isTrueProperty(val)
    }
  },
  methods: {
    present (allowTouchMove) {
      if (!allowTouchMove) {
        document.body.addEventListener('touchmove', preventDefault)
      }
      this.activated = true
    },

    dismiss (allowTouchMove) {
      if (!allowTouchMove) {
        document.body.removeEventListener('touchmove', preventDefault)
      }
      this.activated = true
      return timeout(100)
    },
    getState () {
      return this.activated
    }
  }
}
</script>

<style lang="scss">
@import "backdrop";
@import "../../transition/backdrop";
</style>
