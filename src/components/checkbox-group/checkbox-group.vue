<template>
  <ion-list :title="title">
    <ion-item
      :key="option.value"
      v-for="option in processOptions"
    >
      <ion-label slot="item-label">{{option.label}}</ion-label>
      <ion-checkbox
        :slot="labelPosition==='right'?'item-start':'item-end'"
        :disabled="option.disabled"
        :value="getChecked(option.value)"
        :color="getColor(option.color)"
        @onChange="onChangeHandler(option.value)"
      ></ion-checkbox>
    </ion-item>
  </ion-list>
</template>
<script>
  import ThemeMixins from '../../themes/theme.mixins'
  import IonList from '../list'
  import IonItem from '../item'
  import IonCheckbox from '../checkbox'

  export default {
    name: 'ion-checkbox-group',
    mixins: [ThemeMixins],
    components: {
      IonItem,
      IonList,
      IonCheckbox
    },
    props: {
      title: String,
      options: {
        type: Array,
        required: true
      },
      value: {
        type: Array,
        default: () => []
      },
      labelPosition: {
        type: String,
        default: 'right'
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
        return this.currentValue.indexOf(val) !== -1
      },

      onChangeHandler (val) {
        let index = this.currentValue.indexOf(val)
        if (index === -1) {
          this.currentValue.push(val)
        } else {
          this.currentValue.splice(index, 1)
        }
        this.currentValue.sort()

        this.$emit('input', this.currentValue)
        this.$emit('onChange', this.currentValue)
      },

      // option的颜色优先
      getColor: function (optionColor) {
        return typeof optionColor !== 'undefined' ? optionColor : this.color
      }
    }
  }
</script>
