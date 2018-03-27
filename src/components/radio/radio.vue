<template>
  <div :class="[modeClass, colorClass, {'radio-disabled':disabled}]">
    <div :class="['radio-icon', {'radio-checked':isChecked}]">
      <div class="radio-inner"></div>
    </div>
    <vm-button role="radio" :disabled="disabled" @click.native="onChecked"></vm-button>
  </div>
</template>
<script type="text/javascript">
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
import ModeMixins from '../../themes/theme.mixins'
import VmButton from '../button'

export default {
  name: 'vm-radio',
  mixins: [ModeMixins],
  inject: {
    itemComponent: {
      from: 'itemComponent',
      default: null
    },
    listComponent: {
      from: 'listComponent',
      default: null
    }
  },
  components: {
    VmButton
  },
  data () {
    return {
      isChecked: isTrueProperty(this.checked),
      isDisabled: isTrueProperty(this.disabled),
      radioGroupCmp: null
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

      this.itemComponent.setElementClass('item-radio-disabled', disabled)
    },

    setChecked (checkedValue) {
      let isChecked = checkedValue === this.value
      if (this.isChecked !== isChecked) {
        this.isChecked = isChecked

        this.itemComponent.setElementClass('item-radio-checked', this.isChecked)
        this.itemComponent.setElementClass(`item-radio-${this.mode}-${this.color}`, this.isChecked && isPresent(this.color))
      }
    },

    onChecked (ev) {
      ev.preventDefault()
      ev.stopPropagation()

      !this.isDisabled && this.$emit('onSelect', this.value)
    },

    init () {
      // if parent is item
      this.itemComponent && this.itemComponent.setElementClass('item-radio', true)

      // if parent's parent is list
      if (this.listComponent && this.listComponent.radioGroup) {
        this.radioGroupCmp = this.listComponent
        this.radioGroupCmp.addRadioButton(this)
      }
      console.assert(this.radioGroupCmp, 'Radio组件需要在List组件中加上`radio-group`属性才能正常使用v-model指令!')

      // 初始化禁用状态
      this.setDisabled(isTrueProperty(this.disabled))
    }
  },
  destroyed () {
    this.radioGroupCmp && this.radioGroupCmp.removeRadioButton(this)
  }
}
</script>

<style lang="scss">
@import "radio.ios";
@import "radio.md";
</style>
