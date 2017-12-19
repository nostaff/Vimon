<template>
  <transition name="backdrop-fade">
    <div class="ion-backdrop"
      :class="{'backdrop-no-tappable': !isEnableBackdropDismiss}"
      role="presentation"
      v-show="activated"
      @click="clickHandler"
      @touchmove="onTouchMoveHandler($event)"></div>
  </transition>
</template>

<script>
import { isTrueProperty } from '../../util/util'
import ModeMixins from '../../themes/theme.mixins'

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
    /**
      * @private
      * @param {Object} $event - $event
      */
    clickHandler ($event) {
      this.$emit('click', $event)
    },
    beforeEnter () {
      this.$emit('onShown')
    },
    afterLeave () {
      this.$emit('onHidden')
    },
    onTouchMoveHandler ($event) {
      $event.preventDefault()
      $event.stopPropagation()
    }
  }
}
</script>

<style lang="scss">
@import "backdrop";
@import "../../transition/backdrop";
</style>
