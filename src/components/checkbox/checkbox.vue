<template>
  <div :class="[themeClass, colorClass, {'checkbox-disabled':disabled}]">
    <div :class="['checkbox-icon', {'checkbox-checked':isChecked}]">
      <div class="checkbox-inner"></div>
    </div>
    <ion-button role="checkbox" :disabled="disabled" @click.native="onChecked"></ion-button>
  </div>
</template>
<script>
/**
 * @component Checkbox
 * @description
 *
 * ## 表单组件 / Checkbox复选框(检查框)组件
 *
 * ### 注意
 *
 * 使用v-modal切换状态, 不支持checked属性
 *
 * ### 如何引入
 * ```
 * // 引入
 * import {Checkbox} from 'vimon'
 * // 安装
 * Vue.component(Checkbox.name, Checkbox)
 * // 或者
 * export default{
 *   components: {
 *    Checkbox
 *  }
 * }
 *```
  *
  * @props {String} [mode='ios'] - 模式
  * @props {String} [color] - 颜色
  * @props {Boolean} [disabled=false] - 单向选择, 点击且换并不对父组件传递
  * @props {Boolean} [value] - 当前值
  *
  * @fires component:Checkbox#onChange
  * @demo #/checkbox
  *
  * @usage
  * <Item>
  *    <Label>Danger</Label>
  *    <Checkbox slot="item-left" color="danger" v-model="testModal" :disabled="testDisabled" @onChange="onCheckboxChange"></Checkbox>
  * </Item>
  **/
import { isTrueProperty } from '../../util/util'
import ThemeMixins from '../../themes/theme.mixins'
import IonButton from '../button/index'
export default {
  name: 'ion-checkbox',
  mixins: [ThemeMixins],
  components: {
    IonButton
  },
  data () {
    return {
      isChecked: isTrueProperty(this.value),
      isDisabled: isTrueProperty(this.disabled),

      itemCmp: null
    }
  },
  props: {
    value: {
      type: [String, Boolean],
      required: true
    },
    disabled: {
      type: [Boolean, String],
      default: false
    }
  },
  watch: {
    disabled (val) {
      this.setDisabled(isTrueProperty(val))
    },
    value (val) {
      this.setChecked(isTrueProperty(val))
    }
  },
  mounted () {
    if (this.$parent && this.$parent.$data.componentName === 'ionItem') {
      this.itemCmp = this.$parent
      this.itemCmp.$el.classList.add('item-checkbox')
    }

    this.setChecked(this.isChecked)
    this.setDisabled(this.isDisabled)
  },
  methods: {
    setChecked (checked) {
      if (checked !== this.isChecked) {
        this.isChecked = checked
        this.$emit('onChange', this.isChecked)
        this.$emit('input', this.isChecked)

        this.itemCmp &&
          this.itemCmp.setElementClass('item-checkbox-checked', this.isChecked)
      }
    },
    setDisabled (disabled) {
      this.isDisabled = disabled
      this.itemCmp &&
        this.itemCmp.setElementClass('item-checkbox-disabled', this.isDisabled)
    },
    onChecked (ev) {
      ev.preventDefault()
      ev.stopPropagation()

      !this.isDisabled && this.setChecked(!this.isChecked)
    }
  }
}
</script>
<style lang="scss">
@import "checkbox.ios";
@import "checkbox.md";
</style>
