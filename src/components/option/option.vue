<template>
  <span :label="label" :disabled="isDisabled" :selected="isSelected"></span>
</template>
<script type="text/javascript">
import { isBlank, isTrueProperty } from '../../util/util'

export default {
  name: 'vm-option',
  inject: {
    selectComponent: {
      from: 'selectComponent',
      default: null
    }
  },
  data () {
    return {
      isSelected: isTrueProperty(this.selected),
      isDisabled: isTrueProperty(this.disabled),
      label: '',
      optionValue: this.value
    }
  },
  props: {
    value: [Object, String, Array],
    text: [String],
    disabled: [Boolean, String],
    selected: [Boolean, String]
  },
  methods: {
    getText () {
      if (this.text) {
        return this.text.trim()
      } else if (
        this.$slots.default &&
        this.$slots.default[0] &&
        this.$slots.default[0].text
      ) {
        return this.$slots.default[0].text.trim()
      }
      return ''
    }
  },
  mounted () {
    this.label = this.getText()

    console.assert(this.selectComponent, 'Option组件必须在Select组件之内使用!')

    // if parent is select
    this.selectComponent && this.selectComponent.updateOptionList(this)

    if (isBlank(this.optionValue)) {
      this.optionValue = this.label
    }
  }
}
</script>
