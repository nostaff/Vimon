<template>
  <div class="ion-list" :class="[themeClass]">
    <ion-list-header v-if="title">{{title}}</ion-list-header>
    <slot></slot>
  </div>
</template>
<script>
  import {isBlank} from '../../util/util'
  import ThemeMixins from '../../themes/theme.mixins'
  import IonListHeader from '../list-header'

  export default {
    name: 'ion-list',
    mixins: [ThemeMixins],
    components: {
      IonListHeader
    },
    props: {
      title: String,
      radioGroup: Boolean,
      value: String
    },
    data () {
      return {
        componentName: 'ionList',

        checkedValue: this.value,
        radioButtons: [],
        timer: null,

        enableSliding: false,
        containsSlidingItems: false
      }
    },
    watch: {
      value (val) {
        this.checkedValue = val
      },
      checkedValue (val) {
        this.radioButtons.forEach((button) => {
          button.setChecked(val)
        })
      }
    },

    methods: {

      // called by radio button where checked
      onRadioChecked (value) {
        // loop through each of the radiobuttons
        this.radioButtons.forEach(button => {
          button.setChecked(value)
        })

        this.$emit('input', value)
        this.$emit('onChange', value)
      },

      addRadioButton (button) {
        this.radioButtons.push(button)

        if (isBlank(this.checkedValue) && button.isChecked) {
          this.checkedValue = button.value
        }

        // listen for radiobutton select events
        button.$on('onSelect', (val) => {
          // this radiobutton has been selected
          this.onRadioChecked(val)
        })

        this.timer && clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.radioButtons.forEach((button) => {
            button.setChecked(this.checkedValue)
          })
        }, 0)
      },

      removeRadioButton (button) {
        let index = this.radioButtons.indexOf(button)
        if (index > -1) {
          if (button.value === this.checkedValue) {
            this.checkedValue = null
          }
          this.radioButtons.splice(index, 1)
        }
      }

    }
  }
</script>

<style lang="scss">
  @import 'list';
  @import 'list.ios';
  @import 'list.md';
</style>
