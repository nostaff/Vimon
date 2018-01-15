<template>
  <div class="ion-input" :class="[modeClass,{'clearInput':isClearInput}]" @click="setFocus($event)">
    <div class="input-inner-wrap">
      <input ref="input"
        :class="['text-input', 'text-input-'+mode]"
        :value="inputValue"
        :type="typeValue"
        :placeholder="placeholder"
        :disabled="isDisabled"
        :readonly="isReadonly"
        :max="max"
        :min="min"
        :step="step"
        :autofocus="autofocus"
        :autocorrect="autocorrect"
        :autocomplete="autocomplete"
        :autocapitalize="autocapitalize"
        @keyup="inputKeyUp($event)"
        @blur="inputBlurred($event)"
        @focus="inputFocused($event)"
        @input="inputChanged($event)"
        @keydown="inputKeyDown($event)">
    </div>
    <vm-button v-if="isClearInput && hasValue"
      clear
      class="text-input-clear-icon"
      @click="clearTextInput()"></vm-button>
  </div>
</template>

<script type="text/javascript">
import REGEXP from '../../util/regexp'
import debounce from 'lodash.debounce'
import {isTrueProperty, isBlank, isFunction, isObject, isPresent, isRegExp} from '../../util/util'
import {hasFocus} from '../../util/dom'
import ModeMixins from '../../themes/theme.mixins'
import VmButton from '../button'

export default {
  name: 'vm-input',
  mixins: [ModeMixins],
  inject: {
    itemComponent: {
      from: 'itemComponent',
      default: null
    }
  },
  components: {
    VmButton
  },
  props: {
    /**
     * @input {string} The type of control to display. The default type is text.
     * Possible values are: `"text"`, `"password"`, `"email"`, `"number"`, `"search"`, `"tel"`, or `"url"`.
     */
    type: {
      type: String,
      default: 'text'
    },

    value: {
      type: [String, Number],
      required: false
    },

    /**
     * @input {boolean} If true, a clear icon will appear in the input when there is a value. Clicking it clears the input.
     */
    clearInput: {
      type: [String, Boolean],
      default: false
    },

    /**
     * @input {boolean} If true, the user cannot modify the value.
     */
    readonly: {
      type: [String, Boolean],
      default: false
    },

    /**
     * @input {boolean} If true, the user cannot modify the value.
     */
    disabled: {
      type: [String, Boolean],
      default: false
    },

    autocapitalize: String,
    autocomplete: String,
    autocorrect: String,
    autofocus: [Boolean, String],

    /**
     * @input {string} Instructional text that shows before the input has a value.
     */
    placeholder: String,

    /**
     * @input {any} The minimum value, which must not be greater than its maximum (max attribute) value.
     */
    min: {
      type: [String, Number],
      validator (val) {
        return parseInt(val) >= 0
      }
    },

    /**
     * @input {any} The maximum value, which must not be less than its minimum (min attribute) value.
     */
    max: {
      type: [String, Number],
      validator (val) {
        return parseInt(val) >= 0
      }
    },

    /**
     * @input {any} Works with the min and max attributes to limit the increments at which a value can be set.
     */
    step: {
      type: [String, Number],
      validator (val) {
        return parseInt(val) >= 0
      }
    },

    /**
     * focus时, 下划线是否高亮
     */
    showFocusHighlight: Boolean,

    /**
     * 验证成功是否显示 highlight
     */
    showValidHighlight: Boolean,

    /**
     * 验证失败是否显示 highlight
     */
    showInvalidHighlight: Boolean,

    /**
     * 设置type=number的小数位
     */
    decimal: {
      type: [String, Number],
      validator (val) {
        return parseInt(val) >= 0
      },
      default: 2
    },

    debounce: {
      type: [String, Number],
      validator (val) {
        return parseInt(val) >= 0
      },
      default: 10
    },

    // 自定义输入结果验证的正则表达式
    regex: RegExp,

    /**
     * 是否valid输入结果, 如果regex有值, 则开启, 否自关闭.
     * 如果valid开启, 但是regex无值, 则使用内置判断
     * 默认关闭valid
     */
    valid: [Boolean, String]
  },
  data () {
    return {
      oldInputValue: null, // 内部value值
      inputValue: this.value, // 内部value值
      typeValue: this.type, // 内部type值

      isValid: isTrueProperty(this.valid) || this.regex, // 内部valid值, 判断是否需要验证结果
      isReadonly: isTrueProperty(this.readonly),
      isDisabled: isTrueProperty(this.disabled),
      isAutofocus: isTrueProperty(this.autofocus),
      isClearInput: isTrueProperty(this.clearInput),

      executeEmit () {},

      shouldBlur: true // 点击清楚按钮时使用
    }
  },
  watch: {
    value (val) {
      this.inputValue = val
      this.setItemHasValueClass()
    }
  },
  computed: {
    inputElement () {
      return this.$refs.input
    },
    hasValue () {
      const inputValue = this.inputValue
      return (inputValue !== null && inputValue !== undefined && inputValue !== '')
    }
  },
  created () {
    // 根据 REGEXP 匹配 type 的真正规则
    if (isObject(REGEXP[this.type]) && isPresent(REGEXP[this.type].type)) {
      this.typeValue = REGEXP[this.type].type
    } else {
      this.typeValue = this.type
    }

    // 生成emit执行体
    this.executeEmit = this.initDebounce()
  },
  mounted () {
    // 找到外部item实例
    if (this.itemComponent) {
      this.itemComponent.setElementClass('item-input', true)
      this.itemComponent.setElementClass('show-focus-highlight', this.showFocusHighlight)
      this.itemComponent.setElementClass('show-valid-highlight', this.showValidHighlight)
      this.itemComponent.setElementClass('show-invalid-highlight', this.showInvalidHighlight)
    }

    // 初始化时,判断是否有value
    this.setItemHasValueClass()

    // 手动focus
    if (this.isAutofocus) {
      window.setTimeout(() => {
        this.setFocus()
      }, 16 * 3)
    }
  },
  methods: {
    setFocus () {
      if (!hasFocus(this.inputElement)) {
        this.inputElement.focus()
      }
    },

    clearTextInput () {
      this.inputValue = ''
      this.inputChanged()
      this.shouldBlur = false

      this.setFocus()
      this.setItemHasFocusClass(true)
    },

    checkBoundary ($event) {
      let inputText = $event.target.value // text
      let resetValue = null

      // 数字边界限制
      // 这段代码已在很卡顿的安卓机上试验过了, 之所以不在watch阶段重置, 是因为在较慢的安卓机上有数字抖动的情况
      // 现在已能很好的处理
      if (this.typeValue === 'number') {
        resetValue = inputText
        if (isPresent(inputText)) {
          if (isPresent(this.max) && parseFloat(inputText) > parseInt(this.max)) {
            resetValue = this.oldInputValue
          }

          if (isPresent(this.min) && parseFloat(inputText) < parseInt(this.min)) {
            resetValue = this.min
          }

          // 小数点检查, 使用string的方式, number的方式会有奇怪的问题, 比如: 222.22 -> 222.19
          let int = resetValue.toString().split('.')[0]
          let decimals = resetValue.toString().split('.')[1]

          if (decimals && this.decimal > 0) {
            if (decimals.length > this.decimal) {
              decimals = decimals.substr(0, this.decimal)
              resetValue = `${int}.${decimals}`
            }
          }
        }

        if (resetValue !== inputText) {
          $event.target.value = resetValue
        }
      } else {
        resetValue = inputText
        // 非数字 且有 最大长度限制
        if (isPresent(this.max) && isPresent(inputText) && inputText.toString().length > this.max) {
          resetValue = this.oldInputValue
          // 重置 input 输入框
          $event.target.value = resetValue
        }
      }

      return resetValue
    },

    inputKeyUp ($event) {
      this.$emit('onKeyup', $event)
    },

    /**
     * @event component:Input#onKeydown
     * @description keydown事件
     * @private
     */
    inputKeyDown ($event) {
      this.$emit('onKeydown', $event)

      this.oldInputValue = this.inputValue
    },

    /**
     * 监听并发送blur事件
     * @private
     */
    inputBlurred () {
      // debug: clearInput会在onBlur之后,造成blur后点击clearInput失效, 故需要延迟blur
      window.setTimeout(() => {
        if (this.shouldBlur) {
          // 向父组件Item添加标记
          this.setItemHasFocusClass(false)

          this.$emit('onBlur')

          // 验证输入结果
          this.validation()
        } else {
          this.shouldBlur = true
        }
      }, 16 * 2)
    },

    /**
     * 监听并发送focus事件
     * @private
     */
    inputFocused () {
      // 向父组件Item添加标记
      this.setItemHasFocusClass(true)
      this.setFocus()

      this.$emit('onFocus')
      this.itemComponent && this.itemComponent.setElementClass('ng-touched', true)
    },

    /**
     * 监听input事件, 更新input的value(inputValue)
     * @param {Event} [$event] - 事件(可选)
     * @private
     */
    inputChanged ($event) {
      if ($event && $event.target) {
        // 输入限制检查
        this.inputValue = this.checkBoundary($event)
        // debounce
        this.executeEmit()
      } else {
        // clear的情况
        // 需要同步设置input元素的值
        this.inputElement.value = null
        this.inputValue = null
        // 立即发送变化, 不需要debounce
        this.emitChange()
      }

      this.setItemHasValueClass()
    },

    /**
     * 执行验证, 如果错误则设置ng-invalid, 正确则设置ng-valid
     * @private
     */
    validation () {
      // 只有开启才检查
      if (!this.isValid) return

      console.log(this.inputValue, this.type)
      let isValid = this.getVerifyResult(this.inputValue, this.type)
      if (isValid) {
        this.$emit('onValid', this.inputValue, this.type)
        if (this.itemComponent) {
          this.itemComponent.setElementClass('ng-valid', true)
          this.itemComponent.setElementClass('ng-invalid', false)
        }
      } else {
        this.$emit('onInvalid', this.inputValue, this.type)
        if (this.itemComponent) {
          this.itemComponent.setElementClass('ng-valid', false)
          this.itemComponent.setElementClass('ng-invalid', true)
        }
      }
    },

    /**
     * 获取验证结果
     * @param {*} value - 待验证的值
     * @param {String} type - 待验证的值的类型
     * @return Boolean
     * @private
     */
    getVerifyResult (value, type = 'text') {
      if (!isPresent(value)) {
        return false
      }

      let _regex = this.regex
      if (isBlank(_regex)) {
        let regexpInfo = REGEXP[type]
        if (regexpInfo && (isRegExp(regexpInfo) || isFunction(regexpInfo))) {
          _regex = regexpInfo
        } else if (regexpInfo && (isRegExp(regexpInfo.regexp) || isFunction(regexpInfo.regexp))) {
          _regex = regexpInfo.regexp
        }
      }

      // 如果没有正则信息则返回true, 表示不验证
      if (!isPresent(_regex)) {
        return false
      }

      // 如果是函数则执行判断
      if (isFunction(_regex)) {
        return _regex(value)
      }

      // 判断是不是正则
      if (isRegExp(_regex)) {
        return _regex.test(value)
      }

      return false
    },

    initDebounce () {
      if (parseInt(this.debounce) > 0) {
        return debounce(function () {
          this.emitChange()
        }, parseInt(this.debounce))
      } else {
        return () => {
          this.emitChange()
        }
      }
    },

    emitChange () {
      /**
       * @event  component:Input#onInput
       * @description input事件
       * @property {*} value - 当前输入的值
       */
      this.$emit('onInput', this.inputValue)
      this.$emit('input', this.inputValue)
    },

    setItemHasFocusClass (isFocused) {
      this.itemComponent && this.itemComponent.setElementClass('item-input-has-focus', isFocused)
    },

    setItemHasValueClass () {
      this.itemComponent && this.itemComponent.setElementClass('item-input-has-value', !!this.hasValue)
    }
  }
}
</script>

<style lang="scss">
  @import "input";
  @import "input.ios";
  @import "input.md";
</style>
