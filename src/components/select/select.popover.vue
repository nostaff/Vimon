<template>
  <ion-list radio-group v-model="checkedValue" @onChange="onRadioChecked($event)">
    <ion-item v-for="option in options" :key="option">
      <ion-label slot="item-label">{{option.text}}</ion-label>
      <ion-radio slot="item-content" :value="option.value" :disabled="option.disabled"></ion-radio>
    </ion-item>
  </ion-list>
</template>
<script type="text/javascript">
  import Popover from '../popover'
  import IonList from '../list'
  import IonItem from '../item'
  import IonLabel from '../label'
  import IonRadio from '../radio'

  export default {
    name: 'ion-select-popover',
    components: {
      IonRadio,
      IonLabel,
      IonItem,
      IonList
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
