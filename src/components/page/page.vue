<template>
  <div class="ion-page" :box="isBox" :style="{zIndex:pageZIndex}" :class="{'vm-box':isBox}">
    <slot></slot>
  </div>
</template>

<script>
import {isTrueProperty} from '../../util/util'
import ModeMixins from '../../themes/theme.mixins'

let initPageZIndex = 1000
export default {
  name: 'vm-page',
  mixins: [ModeMixins],
  inject: {
    modalComponent: {
      from: 'modalComponent',
      default: null
    }
  },
  provide () {
    let _this = this
    return {
      pageComponent: _this
    }
  },
  data () {
    return {
      pageZIndex: 0,
      headerComponent: null,
      footerComponent: null,

      isBox: isTrueProperty(this.box) || !!this.modalComponent
    }
  },
  props: {
    box: {
      type: [Boolean, String],
      default () {
        return this.$config && this.$config.getBoolean('box') || false
      }
    }
  },
  created () {
    let direction = this.$history.getDirection()
    if (direction === 'forward') {
      this.pageZIndex = ++initPageZIndex
    } else if (direction === 'backward') {
      this.pageZIndex = --initPageZIndex
    } else {
      this.pageZIndex = initPageZIndex
    }
  }
}
</script>
