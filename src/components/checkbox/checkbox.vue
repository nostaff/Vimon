<template>
  <div :class="[modeClass, colorClass, {'checkbox-disabled':disabled}]">
    <div :class="['checkbox-icon', {'checkbox-checked':isChecked}]">
      <div class="checkbox-inner"></div>
    </div>
    <ion-button role="checkbox" :disabled="disabled" @click.native="onChecked"></ion-button>
  </div>
</template>
<script>
import { isTrueProperty } from '../../util/util'
import ModeMixins from '../../themes/theme.mixins'
import IonButton from '../button'
export default {
  name: 'ion-checkbox',
  mixins: [ModeMixins],
  components: {
    IonButton
  },
  data () {
    return {
      isChecked: isTrueProperty(this.value),
      isDisabled: isTrueProperty(this.disabled),

      itemCmp: null
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
    if (this.$parent && this.$parent.$data.componentName === 'ionItem') {
      this.itemCmp = this.$parent
      this.itemCmp.$el.classList.add('item-checkbox')
    }

    this.setChecked(this.isChecked)
    this.setDisabled(this.isDisabled)
  },
  methods: {
    setChecked (checked) {
      if (checked !== this.isChecked) {
        this.isChecked = checked
        this.$emit('onChange', this.isChecked)
        this.$emit('input', this.isChecked)

        this.itemCmp &&
          this.itemCmp.setElementClass('item-checkbox-checked', this.isChecked)
      }
    },
    setDisabled (disabled) {
      this.isDisabled = disabled
      this.itemCmp &&
        this.itemCmp.setElementClass('item-checkbox-disabled', this.isDisabled)
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
