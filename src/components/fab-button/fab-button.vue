<template>
  <button class="ion-fab-button" 
      :class="[modeClass,colorClass]" 
      @click="clickHandler"
      @touchstart="touchStart"
      @mousedown="mouseDown"
    >
    <vm-icon name="close" class="fab-close-icon" v-if="isMainButton"></vm-icon>
    <span class="button-inner">
      <slot></slot>
    </span>
  </button>
</template>
<script type="text/javascript">
import { addRippleEffect, isActivatedDisabled } from '../../util/dom'
import ModeMixins from '../../themes/theme.mixins'
import VmIcon from '../icon/icon'

export default {
  name: 'vm-fab-button',
  mixins: [ModeMixins],
  components: {
    VmIcon
  },
  inject: {
    fabComponent: {
      from: 'fabComponent',
      default () {
        return null
      }
    },
    fabListComponent: {
      from: 'fabListComponent',
      default: null
    }
  },
  data () {
    return {
      lastClick: -10000
    }
  },
  computed: {
    isMainButton () {
      return !this.fabListComponent && !!this.fabComponent
    }
  },
  created () {
    if (!this.isMainButton) {
      this.fabListComponent && this.fabListComponent.setFabButton(this)
    } else {
      this.fabComponent.mainButton = this
    }
  },
  methods: {
    /**
     * 按钮点击处理函数, 如果是主button, 则Fab组件改写此方法
     * @private
     **/
    clickHandler () {
      this.$emit('click', this.fabComponent)
      this.isMainButton && this.fabComponent.toggleClicked()
    },
    touchStart (ev) {
      if (this.mode !== 'md' || isActivatedDisabled(ev, this.$el)) return

      this.lastClick = Date.now()
      const touches = ev.touches[0]
      addRippleEffect(this.$el, touches.clientX, touches.clientY)
    },
    mouseDown (ev) {
      if (this.mode !== 'md' || isActivatedDisabled(ev, this.$el)) return

      const timeStamp = Date.now()
      if (this.lastClick < (timeStamp - 1000)) {
        addRippleEffect(this.$el, ev.pageX, ev.pageY)
      }
    },
    /**
     * @hidden
     */
    setActiveClose (closeVisible) {
      this.setElementClass('fab-close-active', closeVisible)
    }
  }
}
</script>

<style lang="scss">
  @import 'fab-button';
  @import 'fab-button.ios';
  @import 'fab-button.md';
  @import '../button/button-effect';
</style>