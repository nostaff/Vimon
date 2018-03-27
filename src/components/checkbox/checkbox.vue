<template>
  <div :class="[modeClass, colorClass, {'checkbox-disabled':disabled}]">
    <div :class="['checkbox-icon', {'checkbox-checked':isChecked}]">
      <div class="checkbox-inner"></div>
    </div>
    <vm-button role="checkbox" :disabled="disabled" @click.native="onChecked"></vm-button>
  </div>
</template>
<script type="text/javascript">
import { isTrueProperty } from '../../util/util'
import ModeMixins from '../../themes/theme.mixins'
import VmButton from '../button'
export default {
  name: 'vm-checkbox',
  mixins: [ModeMixins],
  components: {
    VmButton
  },
  inject: {
    itemComponent: {
      from: 'itemComponent',
      default: null
    }
  },
  data () {
    return {
      isChecked: isTrueProperty(this.value),
      isDisabled: isTrueProperty(this.disabled)
    }
  },
  props: {
    value: {
      type: [String, Boolean],
      required: true
    },
    disabled: {
      type: [Boolean, String],
      default: false
    }
  },
  watch: {
    disabled (val) {
      this.setDisabled(isTrueProperty(val))
    },
    value (val) {
      this.setChecked(isTrueProperty(val))
    }
  },
  mounted () {
    this.itemComponent && this.itemComponent.setElementClass('item-checkbox', true)

    this.setChecked(this.isChecked)
    this.setDisabled(this.isDisabled)
  },
  methods: {
    setChecked (checked) {
      if (checked !== this.isChecked) {
        this.isChecked = checked
        this.$emit('onChange', this.isChecked)
        this.$emit('input', this.isChecked)

        this.itemComponent && this.itemComponent.setElementClass('item-checkbox-checked', this.isChecked)
      }
    },
    setDisabled (disabled) {
      this.isDisabled = disabled
      this.itemComponent && this.itemComponent.setElementClass('item-checkbox-disabled', this.isDisabled)
    },
    onChecked (ev) {
      ev.preventDefault()
      ev.stopPropagation()

      !this.isDisabled && this.setChecked(!this.isChecked)
    }
  }
}
</script>
<style lang="scss">
@import "checkbox.ios";
@import "checkbox.md";
</style>
