<template>
  <div :class="[modeClass, colorClass, {'radio-disabled':disabled}]">
    <div :class="['radio-icon', {'radio-checked':isChecked}]">
      <div class="radio-inner"></div>
    </div>
    <vm-button role="radio" :aria-checked="isChecked" :disabled="disabled" @click.native="onChecked"></vm-button>
  </div>
</template>
<script type="text/javascript">
import { isTrueProperty, isPresent } from '../../util/util'
import ModeMixins from '../../themes/theme.mixins'
import VmButton from '../button'

export default {
  name: 'vm-radio',
  mixins: [ModeMixins],
  inject: {
    itemComponent: {
      from: 'itemComponent',
      default: null
    },
    listComponent: {
      from: 'listComponent',
      default: null
    }
  },
  components: {
    VmButton
  },
  data () {
    return {
      isChecked: isTrueProperty(this.checked),
      isDisabled: isTrueProperty(this.disabled),
      radioGroupCmp: null
    }
  },
  props: {
    value: {
      type: [Number, String, Boolean],
      required: true
    },
    disabled: {
      type: [Boolean, String],
      default: false
    },
    checked: {
      type: [Boolean, String],
      default: false
    }
  },
  watch: {
    disabled (val) {
      this.setDisabled(isTrueProperty(val))
    },
    checked (val) {
      isTrueProperty(val) && this.setChecked(this.value)
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    setDisabled (disabled) {
      this.setChecked(null)
      this.isDisabled = disabled

      this.itemComponent.setElementClass('item-radio-disabled', disabled)
    },

    setChecked (checkedValue) {
      let isChecked = checkedValue === this.value
      if (this.isChecked !== isChecked) {
        this.isChecked = isChecked

        this.itemComponent.setElementClass('item-radio-checked', this.isChecked)
        this.itemComponent.setElementClass(`item-radio-${this.mode}-${this.color}`, this.isChecked && isPresent(this.color))
      }
    },

    onChecked (ev) {
      ev.preventDefault()
      ev.stopPropagation()

      !this.isDisabled && this.$emit('onSelect', this.value)
    },

    init () {
      // if parent is item
      this.itemComponent && this.itemComponent.setElementClass('item-radio', true)

      // if parent's parent is list
      if (this.listComponent && this.listComponent.radioGroup) {
        this.radioGroupCmp = this.listComponent
        this.radioGroupCmp.addRadioButton(this)
      }
      console.assert(this.radioGroupCmp, 'Radio组件需要在List组件中加上`radio-group`属性才能正常使用v-model指令!')

      // 初始化禁用状态
      this.setDisabled(isTrueProperty(this.disabled))
    }
  },
  destroyed () {
    this.radioGroupCmp && this.radioGroupCmp.removeRadioButton(this)
  }
}
</script>

<style lang="scss">
@import "radio.ios";
@import "radio.md";
</style>
