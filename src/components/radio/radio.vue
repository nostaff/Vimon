<template>
  <div :class="[themeClass, colorClass, {'radio-disabled':disabled}]">
    <div :class="['radio-icon', {'radio-checked':isChecked}]">
      <div class="radio-inner"></div>
    </div>
    <ion-button role="radio" :disabled="disabled" @click.native="onChecked"></ion-button>
  </div>
</template>
<script>
/**
 * @component Radio
 * @description
 *
 * ## 表单组件 / Radio单选框组件
 *
 * ### 注意
 *
 * 使用v-modal切换状态(数据控制), 不支持checked属性, value为纯string字段, 用于唯一标识;
 *
 * ### 其他
 *
 * - 组件支持异步操作实例化
 * - 目前组件的层级嵌套关系如下:  List -> Item -> Radio
 * - 动态设置了单个radio的禁用状态, 如果之前是选中的则取消选中, 手动点击和数据选中都会生效
 *
 * ### 如何引入
 * ```
 * // 引入
 * import {Radio} from 'vimon'
 * // 安装
 * Vue.component(Radio.name, Radio)
 * // 或者
 * export default{
 *   components: {
 *    Radio
 *  }
 * }
 * ```
 *
 * @props {String} [mode='ios'] - 模式
 * @props {String} [color] - 颜色
 * @props {Boolean} [disabled=false] - 单向选择, 点击且换并不对父组件传递
 *
 * @fire component:Radio#onSelect - 点按选择时触发
 * @demo #/radio
 * @usage
 * <List radio-group v-model="fruits" :disabled="isListDisabled">
 *    <ListHeader>Fruits</ListHeader>
 *    <Item>
 *        <Label>Apple</Label>
 *        <Radio value="apple" :disabled="isAppleDisabled" @onSelect="onSelectHandler"></Radio>
 *    </Item>
 *    <Item>
 *        <Label>Banana</Label>
 *        <Radio value="banana" color="danger" @onSelect="onSelectHandler"></Radio>
 *    </Item>
 *    <Item>
 *        <Label>Cherry (secondary color)</Label>
 *        <Radio value="cherry" color="secondary" @onSelect="onSelectHandler"></Radio>
 *    </Item>
 *    <Item>
 *         <Label>Disabled</Label>
 *        <Radio value="disabled" :disabled="true" @onSelect="onSelectHandler"></Radio>
 *    </Item>
 *    <Item>
 *        <Label>Default</Label>
 *        <Radio value="default" @onSelect="onSelectHandler"></Radio>
 *    </Item>
 * </List>
 *
 **/
import { isTrueProperty, isPresent } from '../../util/util'
import ThemeMixins from '../../themes/theme.mixins'
import IonButton from '../button'

export default {
  name: 'ion-radio',
  mixins: [ThemeMixins],
  components: {
    IonButton
  },
  data () {
    return {
      isChecked: isTrueProperty(this.checked),
      isDisabled: isTrueProperty(this.disabled),
      itemCmp: null,
      radioGroup: null
    }
  },
  props: {
    value: {
      type: [Number, String, Boolean],
      required: true
    },
    disabled: {
      type: [Boolean, String],
      default: false
    },
    checked: {
      type: [Boolean, String],
      default: false
    }
  },
  watch: {
    disabled (val) {
      this.setDisabled(isTrueProperty(val))
    },
    checked (val) {
      isTrueProperty(val) && this.setChecked(this.value)
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    setDisabled (disabled) {
      this.setChecked(null)
      this.isDisabled = disabled

      this.itemCmp.setElementClass('item-radio-disabled', disabled)
    },

    setChecked (checkedValue) {
      let isChecked = checkedValue === this.value
      if (this.isChecked !== isChecked) {
        this.isChecked = isChecked

        this.itemCmp.setElementClass('item-radio-checked', this.isChecked)
        this.itemCmp.setElementClass(`item-radio-${this.theme}-${this.color}`, this.isChecked && isPresent(this.color))
      }
    },

    onChecked (ev) {
      ev.preventDefault()
      ev.stopPropagation()

      !this.isDisabled && this.$emit('onSelect', this.value)
    },

    init () {
      // if parent is item
      if (this.$parent && this.$parent.$data.componentName === 'ionItem') {
        this.itemCmp = this.$parent
        this.itemCmp.setElementClass('item-radio', true)
      }

      // if parent's parent is list
      if (this.$parent && this.$parent.$parent && this.$parent.$parent.$data.componentName === 'ionList') {
        let node = this.$parent.$parent
        if (node.radioGroup) {
          this.radioGroup = node
          this.radioGroup.addRadioButton(this)
        }
        console.assert(this.radioGroup, 'Radio组件需要在List组件中加上`radio-group`属性才能正常使用v-model指令!')
      }

      // 初始化禁用状态
      this.setDisabled(isTrueProperty(this.disabled))
    }
  },
  destroyed () {
    this.radioGroup && this.radioGroup.removeRadioButton(this)
  }
}
</script>

<style lang="scss">
@import "radio.ios";
@import "radio.md";
</style>
