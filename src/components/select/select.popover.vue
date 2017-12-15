<template>
  <vm-list radio-group v-model="checkedValue" @onChange="onRadioChecked($event)">
    <vm-item v-for="option in options" :key="option">
      <vm-label>{{option.text}}</vm-label>
      <vm-radio :value="option.value" :disabled="option.disabled"></vm-radio>
    </vm-item>
  </vm-list>
</template>
<script type="text/javascript">
  import Popover from '../popover'
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
        if (checkedOption && checkedOption.handler) {
          checkedOption.handler()
        }

        Popover.dismiss(value)
      },

      getValue () {
        let checkedOption = this.options.find(option => option.checked)
        return checkedOption ? checkedOption.value : undefined
      }
    }
  }
</script>
