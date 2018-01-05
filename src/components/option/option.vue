<template>
  <span
    v-if="false"
    :label="label"
    :disabled="isDisabled"
    :selected="isSelected"/>
</template>
<script type="text/javascript">
import { isBlank, isTrueProperty } from '../../util/util'
export default {
  name: 'vm-option',
  inject: {
    selectComponent: {
      from: 'selectComponent',
      default () {
        console.error('[Component] Option组件必须在Select组件之内使用!')
        return null
      }
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
    disabled: [Boolean, String],
    selected: [Boolean, String]
  },
  methods: {
    getLabel () {
      if (
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
    this.label = this.getLabel()

    // if parent is select
    this.selectComponent && this.selectComponent.updateOptionList(this)

    if (isBlank(this.optionValue)) {
      this.optionValue = this.label
    }
  }
}
</script>
