<template>
  <vm-list :title="title" radio-group>
    <vm-item :key="index" v-for="(option, index) in processOptions">
      <vm-label>{{option.label}}</vm-label>
      <vm-radio
        :disabled="option.disabled"
        :value="option.value"
        :checked="getChecked(option.value)"
        :color="getColor(option.color)"
        @onSelect="onSelectHandler(option.value)"></vm-radio>
    </vm-item>
  </vm-list>
</template>
<script type="text/javascript">
import ModeMixins from '../../themes/theme.mixins'
import {isPresent} from '../../util/util'
import VmList from '../list'
import VmItem from '../item'
import VmLabel from '../label'
import VmRadio from '../radio'

export default {
  name: 'vm-radio-group',
  mixins: [ModeMixins],
  components: {
    VmItem,
    VmList,
    VmLabel,
    VmRadio
  },
  props: {
    title: String,
    options: {
      type: Array,
      required: true
    },
    value: {
      type: [Number, String, Boolean],
      required: false
    }
  },
  data () {
    return {
      currentValue: this.value
    }
  },
  computed: {
    processOptions () {
      if (this.options.length && {}.hasOwnProperty.call(this.options[0], 'label')) {
        return this.options
      } else {
        return this.options.map(function (item) {
          return {
            label: item,
            value: item,
            disabled: false
          }
        })
      }
    }
  },

  methods: {
    getChecked (val) {
      return this.currentValue === val
    },
    onSelectHandler (newVal) {
      this.currentValue = newVal
      this.$emit('input', newVal)
      this.$emit('onChange', newVal)
    },
    // option的颜色优先
    getColor: function (optionColor) {
      return isPresent(optionColor) ? optionColor : this.color
    }
  }
}
</script>
