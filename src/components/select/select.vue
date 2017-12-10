<template>
  <div class="ion-select" :class="[themeClass, {'select-disabled':isDisabled}]">
    <div v-if="!text" class="select-placeholder select-text">{{placeholder}}</div>
    <div v-else class="select-text">{{selectedText || text}}</div>
    <div class="select-icon">
      <div class="select-icon-inner"></div>
    </div>
    <ion-button role="select" ref="button" :disabled="isDisabled" @click.native="onClickHandler"></ion-button>
    <slot></slot>
  </div>
</template>

<script type="text/javascript">
/**
 * @name Select
 * @component Select
 * @description
 *
 * ## 表单组件 / Select选择组件
 *
 * ### 说明
 *
 * 如果在Select中使用了`v-model`指令时, Option中的`checked`属性将不起作用, 因为两者的使用逻辑是冲突的!
 *
 * `v-model`是在Select组件中使用数据控制, 而`checked`是在Option中使用checked属性控制.
 *
 * ### 数据源
 *
 * 使用此组件建议使用固定数据而不是异步数据, 异步数据使用Alert组件完成.
 *
 * ### 如何引入
 * ```
 * // 引入
 * import { Select, Option } from 'vimon'
 * // 安装
 * Vue.component(Select.name, Select)
 * Vue.component(Option.name, Option)
 * // 或者
 * export default{
 *   components: {
 *     Select, Option
 *  }
 * }
 * ```
 * @props {String} [cancelText='取消'] - cancel按钮显示文本
 * @props {String} [okText='确认'] - OK按钮显示文本
 * @props {Boolean} [disabled='false'] - OK按钮显示文本
 * @props {String} [interface='alert'] - 显示界面类型, 可以是'action-sheet','alert', 'popover'三个
 * @props {Boolean} [multiple='false'] - 单选多选,默认为单选
 * @props {String} [placeholder] - 当未选择时显示的值
 * @props {Object} [selectOptions] - select组件掉用alert和action-sheet组件的, 这个是针对传入的参数 title/subTitle/message/cssClass/enableBackdropDismiss等
 * @props {String} [selectedText] - 选择组件的文本提示, 代替选择的option选项
 * @props {String} [mode='ios'] - 模式
 * @props {Object|String|Array} [value='ios'] - 组件值
 *
 * @fires component:Select#onChange
 * @fires component:Select#onCancel
 * @fires component:Select#onSelect
 *
 * @demo #/select
 *
 * @usage
 * <Item>
 *    <Label>Gender</Label>
 *    <Select item-right placeholder="Select" interface="alert"
 *            @onChange="onChange"
 *            @onSelect="onSelect"
 *            @onCancel="onCancel">
 *        <Option value="f" checked>Female</Option>
 *        <Option value="m">Male</Option>
 *    </Select>
 * </Item>
 */
import { isTrueProperty, isBlank, isArray, isCheckedProperty } from '../../util/util'
import ThemeMixins from '../../themes/theme.mixins'
import Popover from '../popover/index'
import IonButton from '../button'
import SelectPopover from './select.popover.vue'

export default {
  name: 'ion-select',
  mixins: [ThemeMixins],
  components: { IonButton },
  inject: {
    itemComponent: {
      from: 'itemComponent',
      default: null
    }
  },
  provide () {
    const _this = this
    return {
      selectComponent: _this
    }
  },
  data () {
    return {
      optionComponents: [],

      isDisabled: isTrueProperty(this.disabled),
      text: null,
      timer: null,
      values: []
    }
  },
  props: {
    cancelText: {
      type: String,
      default: 'Cancel'
    },
    okText: {
      type: String,
      default: 'OK'
    },
    disabled: [Boolean, String],
    multiple: [Boolean, String],
    placeholder: String,
    interface: {
      type: String,
      default: 'alert',
      validator (val) {
        return ['popover', 'action-sheet', 'alert'].indexOf(val) > -1
      }
    },
    selectOptions: {
      type: Object,
      default () {
        return {}
      }
    },
    selectedText: String,
    value: [String, Array, Number]
  },
  created () {
    if (!isBlank(this.value)) {
      this.values = isArray(this.value) ? this.value : [this.value]
    }
  },
  mounted () {
    // if parent is item
    if (this.itemComponent) {
      let cssClass = this.itemComponent.$el.classList.contains('item-select')
        ? 'item-multiple-inputs'
        : 'item-select'
      this.itemComponent.$el.classList.add(cssClass)
    }
  },
  watch: {
    disabled (val) {
      this.setDisabled(isTrueProperty(val))
    }
  },
  methods: {
    setDisabled (disabled) {
      this.isDisabled = disabled
      this.itemComponent && this.itemComponent.setElementClass('item-select-disabled', this.isDisabled)
    },

    updateText () {
      let texts = []

      if (this.optionComponents) {
        this.optionComponents.forEach(option => {
          // check this option if the option's value is in the values array
          option.isSelected = this.values.some(selectValue => {
            return isCheckedProperty(selectValue, option.optionValue)
          })

          if (option.isSelected) {
            texts.push(option.label)
          }
        })
      }

      this.text = texts.join(', ')
    },

    updateOptionList (option) {
      this.optionComponents.push(option)

      this.timer && clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        if (isBlank(this.value)) {
          this.values = this.optionComponents
            .filter(o => o.isSelected)
            .map(o => o.optionValue)
        }

        this.updateText()
      }, 0)
    },

    onClickHandler (ev) {
      ev.preventDefault()
      ev.stopPropagation()

      this.open(ev)
    },

    open (ev) {
      if (this.isDisabled) {
        return
      }

      // the user may have assigned some options specifically for the alert
      const selectOptions = JSON.parse(JSON.stringify(this.selectOptions))

      // make sure their buttons array is removed from the options
      // and we create a new array for the alert's two buttons
      selectOptions.buttons = [
        {
          text: this.cancelText,
          role: 'cancel',
          handler: () => {
            this.$emit('onCancel', null)
          }
        }
      ]

      // if the selectOptions didn't provide a title then use the label's text
      if (!selectOptions.title && this.itemComponent) {
        selectOptions.title = this.itemComponent.getLabelText()
      }

      let options = this.optionComponents
      if (this.interface === 'action-sheet' && options.length > 6) {
        console.warn(
          'Interface cannot be "action-sheet" with more than 6 options. Using the "alert" interface.'
        )
        this.interface = 'alert'
      }

      if (
        (this.interface === 'action-sheet' || this.interface === 'popover') &&
        this.multiple
      ) {
        console.warn(
          'Interface cannot be "action-sheet" with a multi-value select. Using the "alert" interface.'
        )
        this.interface = 'alert'
      }

      if (this.interface === 'popover' && !ev) {
        console.warn('Interface cannot be "popover" without UIEvent.')
        this.interface = 'alert'
      }

      var selectCssClass
      if (this.interface === 'action-sheet') {
        selectOptions.buttons = selectOptions.buttons.concat(
          options.map(input => {
            return {
              role: input.isSelected ? 'selected' : '',
              text: input.label,
              disabled: input.isDisabled,
              handler: () => {
                this.onChange(input.optionValue)

                this.$emit('onChange', input.optionValue)
                this.$emit('onSelect', input.optionValue)
                this.$emit('input', input.optionValue)
              }
            }
          })
        )
        selectCssClass = 'select-action-sheet'

        // If the user passed a cssClass for the select, add it
        selectCssClass += selectOptions.cssClass
          ? ' ' + selectOptions.cssClass
          : ''

        selectOptions.cssClass = selectCssClass

        this.$actionSheet.present(selectOptions)
      } else if (this.interface === 'popover') {
        let popoverOptions = options.map(input => {
          return {
            text: input.label,
            checked: input.isSelected,
            disabled: input.isDisabled,
            value: input.optionValue,
            handler: () => {
              this.onChange(input.optionValue)

              this.$emit('onChange', input.optionValue)
              this.$emit('input', input.optionValue)
            }
          }
        })

        var popoverCssClass = 'select-popover'

        // If the user passed a cssClass for the select, add it
        popoverCssClass += selectOptions.cssClass
          ? ' ' + selectOptions.cssClass
          : ''

        // ev.target is readonly.
        // place popover regarding to ion-select instead of .button-inner
        Object.defineProperty(ev, 'target', {
          value: ev.currentTarget.parentNode
        })
        selectOptions.ev = ev
        selectOptions.template = SelectPopover
        selectOptions.cssClass = popoverCssClass
        selectOptions.data = { options: popoverOptions }

        Popover.present(selectOptions)
      } else {
        // default to use the alert interface
        this.interface = 'alert'

        // user cannot provide inputs from selectOptions
        // alert inputs must be created by ionic from ion-options
        selectOptions.inputs = options.map(input => {
          return {
            type: this.multiple ? 'checkbox' : 'radio',
            label: input.label,
            value: input.optionValue,
            checked: input.isSelected,
            disabled: input.isDisabled
          }
        })

        selectCssClass = 'select-alert'

        if (this.multiple) {
          selectCssClass += ' multiple-select-alert'
        } else {
          selectCssClass += ' single-select-alert'
        }

        // If the user passed a cssClass for the select, add it
        selectCssClass += selectOptions.cssClass
          ? ' ' + selectOptions.cssClass
          : ''
        selectOptions.cssClass = selectCssClass
        selectOptions.buttons.push({
          text: this.okText,
          handler: value => {
            this.onChange(value)
            this.$emit('onChange', value)
            this.$emit('input', value)
          }
        })

        this.multiple
          ? this.$dialog.checkbox(selectOptions)
          : this.$dialog.radio(selectOptions)
      }
    },

    onChange (value) {
      console.log('select, onChange value:', value)
      this.values = isArray(value) ? value : isBlank(value) ? [] : [value]
      this.updateText()
    }
  }
}
</script>

<style lang="scss">
@import "select";
@import "select.ios";
@import "select.md";
</style>
