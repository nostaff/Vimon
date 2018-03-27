<template>
  <div :class="['ion-segment', modeClass, colorClass]">
    <slot></slot>
  </div>
</template>
<script type="text/javascript">
import { isBlank, isTrueProperty } from '../../util/util'
import ModeMixins from '../../themes/theme.mixins'

let tabIds = -1

export default {
  name: 'vm-segment',
  mixins: [ModeMixins],
  provide () {
    let _this = this
    return {
      segmentComponent: _this
    }
  },
  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    disabled: {
      type: [Boolean, String],
      default: true
    }
  },
  data () {
    return {
      isDisabled: isTrueProperty(this.disable),
      currentValue: this.value,

      buttons: [],

      selectedIndex: -1
    }
  },
  watch: {
    value (val) {
      // 更新子组件状态
      this.refreshButtons(val)
    }
  },
  created () {
    this.id = 't-' + ++tabIds
    this.selectedTabIndex = isBlank(this.selectedIndex) ? 0 : parseInt(this.selectedIndex, 10)
  },
  methods: {
    addButton (button) {
      this.buttons.push(button)

      if (isBlank(this.currentValue) && button.isActive) {
        this.currentValue = button.value
      }

      // listen for button select events
      button.$on('onActived', val => {
        // this button has been selected
        this.onButtonActived(val)
      })

      this.timer && window.clearTimeout(this.timer)
      this.timer = window.setTimeout(() => {
        // 更新子组件状态
        this.refreshButtons(this.currentValue)
      }, 0)
    },
    onButtonActived (value) {
      this.refreshButtons(value)
      this.$emit('input', value)
      this.$emit('onChange', value)
    },
    refreshButtons (value) {
      this.buttons.forEach(button => {
        if (!button.isDisabled) {
          button.setActived(value)
        }
      })
    }
  }
}
</script>

<style lang="scss">
@import "segment";
@import "segment.ios";
@import "segment.md";
</style>
