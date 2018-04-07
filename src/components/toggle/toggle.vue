<template>
  <div :class="[modeClass, colorClass, {'toggle-checked':checked, 'toggle-disabled':disabled}]" @click="onToggle()">
    <div class="toggle-icon">
      <div class="toggle-inner"></div>
    </div>
    <vm-button role="checkbox" disable-activated :aria-disabled="isDisabled" :aria-checked="checked"></vm-button>
  </div>
</template>

<script type="text/javascript">
import { isTrueProperty } from '../../util/util'
import ModeMixins from '../../themes/theme.mixins'
import VmButton from '../button'

export default {
  name: 'vm-toggle',
  mixins: [ModeMixins],
  components: { VmButton },
  inject: {
    itemComponent: {
      from: 'itemComponent',
      default: null
    }
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: [Boolean, String],
      default: false
    }
  },
  data () {
    return {
      checked: false,
      isDisabled: isTrueProperty(this.disabled)
    }
  },
  watch: {
    value (val) {
      this.checked = val
    }
  },
  created () {
    if (typeof this.value !== 'undefined') {
      this.checked = this.value
    }
  },
  methods: {
    onToggle () {
      if (this.isDisabled) return
      this.checked = !this.checked
      this.$emit('input', this.checked)
      this.$emit('onChange', this.checked)
    }
  }
}
</script>

<style lang="scss">
@import "toggle.ios";
@import "toggle.md";
</style>
