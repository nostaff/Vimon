<template>
  <vm-list radio-group v-model="checkedValue" @onChange="onRadioChecked($event)">
    <vm-item v-for="(option,index) in options" :key="index">
      <vm-label>{{option.text}}</vm-label>
      <vm-radio :value="option.value" :disabled="option.disabled"></vm-radio>
    </vm-item>
  </vm-list>
</template>
<script type="text/javascript">
import {isFunction} from '../../util/util'
import VmList from '../list'
import VmItem from '../item'
import VmLabel from '../label'
import VmRadio from '../radio'

export default {
  name: 'vm-select-popover',
  components: {
    VmRadio,
    VmLabel,
    VmItem,
    VmList
  },
  data () {
    return {
      options: [],
      checkedValue: null
    }
  },
  created () {
    this.options = this.$options.$data.options
    this.checkedValue = this.getValue()
  },
  methods: {
    onRadioChecked (value) {
      let checkedOption = this.options.find(option => option.value === value)
      if (checkedOption && isFunction(checkedOption.handler())) {
        checkedOption.handler()
      }
    },
    getValue () {
      let checkedOption = this.options.find(option => option.checked)
      return checkedOption ? checkedOption.value : undefined
    }
  }
}
</script>
