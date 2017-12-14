<template>
  <div :class="['ion-textarea', modeClass]" @click="setFocus()">
    <textarea ref="textarea"
      :class="['text-input', 'text-input-'+mode]"
      :value="currentValue"
      :placeholder="placeholder"
      :disabled="isDisabled"
      :readonly="isReadonly"
      :maxlength="max"
      :rows="rows"
      @blur="onBlur($event)"
      @focus="onFocus($event)"
      @input="onInput($event)"></textarea>
    <div class="input-count" v-if="count > 0">
      <span>{{currentValue.length}}</span>/{{count}}</div>
  </div>
</template>

<script>
import { isPresent, isTrueProperty } from '../../util/util'
import { hasFocus } from '../../util/dom'
import ModeMixins from '../../themes/theme.mixins'

export default {
  name: 'vm-textarea',
  mixins: [ModeMixins],
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
