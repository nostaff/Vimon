<template>
  <div :class="['ion-textarea', themeClass]" @click="setFocus()">
    <textarea ref="textarea" :class="['text-input', 'text-input-'+theme]" :value="currentValue" :placeholder="placeholder" :disabled="isDisabled" :readonly="isReadonly" :maxlength="max" :rows="rows" @blur="onBlur($event)" @focus="onFocus($event)" @input="onInput($event)"></textarea>
    <div class="input-count" v-if="count > 0">
      <span>{{currentValue.length}}</span>/{{count}}</div>
  </div>
</template>

<script>
/**
 * @component Textarea
 * @description
 *
 * ## 表单组件 Textarea输入框
 *
 * ### 如何引入
 * ```
 * // 引入
 * import {Textarea} from 'vimon'
 * // 安装
 * Vue.component(Textarea.name, Textarea)
 * // 或者
 * export default{
 *   components: {
 *     Textarea
 *  }
 * }
 * ```
 *
 * @props {Boolean} [showFocusHighlight]      - focus时底部高亮
 * @props {Boolean} [disabled]                - 如果为true, 用户无法输入
 * @props {Number} [maxlength]                - 设置最大值, 只对textarea有效
 * @props {Number} [rows=3]                   - 设置行数, 只对textarea有效
 * @props {Boolean} [autosize]                - 自动高度
 * @props {Boolean} [autofocus]               - 自动对焦
 * @props {String} [mode='ios']               - 当前平台
 * @props {String} [placeholder]              - 占位文字
 * @props {Boolean} [readonly]                - 只读模式, 不能修改
 * @props {Boolean} [count]                   - 计数模式
 * @props {*} [value]                         - 内容输入值
 *
 * @fires component:Textarea#onBlur
 * @fires component:Textarea#onFocus
 * @fires component:Textarea#onInput
 * @fires component:Textarea#onKeyup
 * @fires component:Textarea#onKeydown
 * @fires component:Textarea#onValid
 * @fires component:Textarea#onInvalid
 *
 * @demo #/textarea
 * @usage
 * <Textarea placeholder="Text Textarea">
 * <Textarea @onBlur="blur($event)" @onFocus="focus($event)" @onInput="onInput($event)" placeholder="Enter a description"></Textarea>
 */
import { isPresent, isTrueProperty } from '../../util/util'
import { hasFocus } from '../../util/dom'
import ThemeMixins from '../../themes/theme.mixins'

export default {
  name: 'ion-textarea',
  mixins: [ThemeMixins],
  data () {
    return {
      itemCmp: null,

      currentValue: this.value || '',
      isReadonly: isTrueProperty(this.readonly),
      isDisabled: isTrueProperty(this.disabled),
      count: parseInt(this.maxlength),

      timer: null,
      shouldBlur: true,
      max: null
    }
  },

  props: {
    value: {
      type: [String, Number],
      required: false
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

    /**
     * @input {string} Instructional text that shows before the input has a value.
     */
    placeholder: String,

    /**
     * @input {any} The rows value.
     */
    rows: {
      type: [String, Number],
      default: 3
    },

    /**
     * @input {any} The maximum length of textarea.
     */
    maxlength: [String, Number]
  },
  computed: {
    textareaElement () {
      return this.$refs.textarea
    }
  },
  watch: {
    value (val) {
      this.currentValue = val
    }
  },
  created () {
    if (this.$parent.$data.componentName === 'ionItem') {
      this.itemCmp = this.$parent
    }
    if (isPresent(this.maxlength)) {
      this.max = parseInt(this.maxlength)
    }
  },
  mounted () {
    if (isPresent(this.itemCmp)) {
      this.itemCmp.setElementClass('item-input', true)
      this.itemCmp.setElementClass('item-textarea', true)
    }

    this.setItemHasValueClass()
  },
  methods: {
    clearTextInput ($event) {
      this.currentValue = ''
      this.onInput()
      this.shouldBlur = false

      this.setItemHasFocusClass(true)
    },
    onInput ($event) {
      this.currentValue = $event && $event.target ? $event.target.value : ''
      this.setItemHasValueClass()

      // debounce
      window.clearTimeout(this.timer)
      this.timer = window.setTimeout(() => {
        this.$emit('onInput', $event)
        this.$emit('input', this.currentValue)
      }, 0)
    },
    onFocus ($event) {
      this.setItemHasFocusClass(true)
      this.setFocus()

      this.$emit('onFocus', $event)
    },
    onBlur ($event) {
      window.setTimeout(() => {
        if (this.shouldBlur) {
          this.setItemHasFocusClass(false)

          this.$emit('onBlur', $event)
        } else {
          this.shouldBlur = true
        }
      }, 16 * 4)
    },
    setFocus () {
      if (!hasFocus(this.textareaElement)) {
        this.textareaElement.focus()
      }
    },
    setItemHasFocusClass (isFocus) {
      this.itemCmp && this.itemCmp.setElementClass('input-has-focus', isFocus)
    },

    setItemHasValueClass () {
      this.itemCmp &&
        this.itemCmp.setElementClass('input-has-value', this.hasValue())
    },

    hasValue () {
      const currentValue = this.currentValue
      return (
        currentValue !== null &&
        currentValue !== undefined &&
        currentValue !== ''
      )
    }
  }
}
</script>

<style lang="scss">
@import "textarea";
@import "textarea.ios";
@import "textarea.md";
</style>
