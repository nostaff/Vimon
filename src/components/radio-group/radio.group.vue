<template>
  <ion-list :title="title" radio-group>
    <ion-item
        :key="option.value"
        v-for="option in processOptions"
      >
      <ion-label slot="item-label">{{option.label}}</ion-label>
      <ion-radio slot="item-content"
        :disabled="option.disabled"
        :value="option.value"
        :checked="getChecked(option.value)"
        :color="getColor(option.color)"
        @onSelect="onSelectHandler(option.value)"
        ></ion-radio>
    </ion-item>
  </ion-list>
</template>
<script>
import ModeMixins from '../../themes/theme.mixins'
import {isPresent} from '../../util/util'
import IonList from '../list'
import IonItem from '../item'

export default {
  name: 'ion-radio-group',
  mixins: [ModeMixins],
  components: {
    IonItem,
    IonList
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
