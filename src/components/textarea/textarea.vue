<template>
    <div class="ion-textarea" :class="[modeClass,{'has-count': this.count > 0}]">
        <div class="input-inner-wrap" @click="setFocus($event)">
            <textarea ref="textarea"
                :class="['text-input', 'text-input-' + mode]"
                :value="inputValue"
                :placeholder="placeholder"
                :disabled="isDisabled"
                :readonly="isReadonly"
                :autofocus="isAutofocus"
                :maxlength="max"
                :rows="rows"
                @keyup="inputKeyUp($event)"
                @blur="inputBlurred($event)"
                @focus="inputFocused($event)"
                @input="inputChanged($event)"
                @keydown="inputKeyDown($event)"></textarea>
            <div class="input-count" v-if="count > 0">
              <span>{{inputValue.length}}</span>/{{count}}
            </div>
        </div>
    </div>
</template>

<script>
import { isPresent, isTrueProperty } from '../../util/util'
import { hasFocus } from '../../util/dom'
import ModeMixins from '../../themes/theme.mixins'
import Autosize from 'autosize'

export default {
  name: 'vm-textarea',
  mixins: [ModeMixins],
  inject: {
    itemComponent: {
      from: 'itemComponent',
      default: null
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

    autosize: {
      type: [String, Boolean],
      default: false
    },

    autofocus: {
      type: [String, Boolean],
      default: false
    },

    required: {
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
      validator (val) {
        return parseInt(val) >= 0
      },
      default: 3
    },

    /**
     * @input {any} The maximum length of textarea.
     */
    maxlength: {
      type: [String, Number],
      validator (val) {
        return parseInt(val) >= 0
      },
      default: null
    },

    /**
     * @input {any} The maximum length of textarea.
     */
    count: {
      type: [String, Number],
      validator (val) {
        return parseInt(val) >= 0
      }
    },

    /**
     * focus时, 下划线是否高亮
     */
    showFocusHighlight: Boolean

  },
  data () {
    return {
      inputValue: this.value || '',
      isReadonly: isTrueProperty(this.readonly),
      isDisabled: isTrueProperty(this.disabled),
      isAutosize: isTrueProperty(this.autosize),
      isAutofocus: isTrueProperty(this.autofocus),
      isRequired: isTrueProperty(this.required),

      max: parseInt(this.maxlength) || null,
      isValid: false,
      timer: null
    }
  },
  computed: {
    textareaElement () {
      return this.$refs.textarea
    },
    hasValue () {
      const inputValue = this.inputValue
      return (inputValue !== null && inputValue !== undefined && inputValue !== '')
    }
  },
  watch: {
    value (val) {
      this.inputValue = val
    }
  },
  created () {
    if (isPresent(this.count)) {
      this.max = parseInt(this.count)
    }
  },
  mounted () {
    if (this.isAutosize) {
      Autosize(this.textareaElement)
    }

    if (this.itemComponent) {
      this.itemComponent.setElementClass('item-input', true)
      this.itemComponent.setElementClass('item-textarea', true)
      this.itemComponent.setElementClass('show-focus-highlight', this.showFocusHighlight)
      this.itemComponent.setElementClass('show-valid-highlight', this.isRequired)
      this.itemComponent.setElementClass('show-invalid-highlight', this.isRequired)
    }

    this.setItemHasValueClass()
  },
  update () {
    console.log('updateupdateupdateupdate')
    Autosize && Autosize.update(this.textareaElement)
  },
  destroy () {
    console.log('destroydestroydestroydestroydestroy')

    Autosize && Autosize.destroy(this.textareaElement)
  },
  methods: {
    /**
       * @function update
       * @description
       * 更新textarea组件
       * */
    update () {
      console.log('update')
      Autosize && Autosize.update(this.textareaElement)
    },
    /**
       * @function destroy
       * @description
       * 销毁textarea组件
       * */
    destroy () {
      console.log('destroy')
      Autosize && Autosize.destroy(this.textareaElement)
    },
    inputKeyUp ($event) {
      this.$emit('onKeyup', $event)
    },
    inputKeyDown ($event) {
      this.$emit('onKeydown', $event)
    },
    inputChanged ($event) {
      this.inputValue = $event && $event.target ? $event.target.value : ''
      this.setItemHasValueClass()

      // debounce
      window.clearTimeout(this.timer)
      this.timer = window.setTimeout(() => {
        this.$emit('onInput', $event)
        this.$emit('input', this.inputValue)
      }, 0)
    },
    inputFocused ($event) {
      this.setItemHasFocusClass(true)
      this.setFocus()

      this.$emit('onFocus', $event)
      this.itemComponent && this.itemComponent.setElementClass('ng-touched', true)
    },
    inputBlurred ($event) {
      this.setItemHasFocusClass(false)

      this.$emit('onBlur', $event)

      // 验证输入结果
      this.verification()
    },
    verification () {
      if (!this.isRequired) return

      this.isValid = this.hasValue
      if (this.isValid) {
        this.$emit('onValid', this.inputValue)
        this.itemComponent && this.itemComponent.setElementClass('ng-valid', true)
        this.itemComponent && this.itemComponent.setElementClass('ng-invalid', false)
      } else {
        this.$emit('onInvalid', this.inputValue)
        this.itemComponent && this.itemComponent.setElementClass('ng-valid', false)
        this.itemComponent && this.itemComponent.setElementClass('ng-invalid', true)
      }
    },
    setFocus () {
      if (!hasFocus(this.textareaElement)) {
        this.textareaElement.focus()
      }
    },
    setItemHasFocusClass (isFocus) {
      this.itemComponent && this.itemComponent.setElementClass('item-input-has-focus', isFocus)
    },

    setItemHasValueClass () {
      this.itemComponent && this.itemComponent.setElementClass('item-input-has-value', this.hasValue)
    }
  }
}
</script>

<style lang="scss">
@import "textarea";
@import "textarea.ios";
@import "textarea.md";
</style>
