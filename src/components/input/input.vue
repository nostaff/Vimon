<template>
  <div :class="['ion-input',themeClass]" @click="setFocus()">
    <input ref="input"
           :class="['text-input', 'text-input-'+theme]"
           :value="currentValue"
           :type="type"
           :placeholder="placeholder"
           :disabled="isDisabled"
           :readonly="isReadonly"
           :max="max"
           :min="min"
           :step="step"
           :autocorrect="autocorrect"
           :autocomplete="autocomplete"
           @blur="onBlur($event)"
           @focus="onFocus($event)"
           @input="onInput($event)">

    <ion-button v-if="isClearInput"
                class="text-input-clear-icon"
                @click.native="clearTextInput($event)"
                clear></ion-button>
  </div>
</template>

<script>
import {isTrueProperty} from '../../util/util'
import {hasFocus} from '../../util/dom'
import ThemeMixins from '../../themes/theme.mixins'
import IonButton from '../button'

export default {
  name: 'ion-input',
  mixins: [ThemeMixins],
  inject: {
    itemComponent: {
      from: 'itemComponent',
      default: null
    }
  },
  components: {
    IonButton
  },
  data () {
    return {
      currentValue: this.value,
      isReadonly: isTrueProperty(this.readonly),
      isDisabled: isTrueProperty(this.disabled),
      isClearInput: isTrueProperty(this.clearInput),

      timer: null,
      shouldBlur: true
    }
  },

  props: {
    /**
       * @input {string} The type of control to display. The default type is text.
       * Possible values are: `"text"`, `"password"`, `"email"`, `"number"`, `"search"`, `"tel"`, or `"url"`.
       */
    type: {
      type: String,
      validator (value) {
        return (
          [
            'text',
            'password',
            'email',
            'number',
            'tel',
            'datetime-local',
            'date',
            'time'
          ].indexOf(value) > -1
        )
      },
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

    /**
     * @input {string} Instructional text that shows before the input has a value.
     */
    autocomplete: String,

    /**
     * @input {string} Instructional text that shows before the input has a value.
     */
    autocorrect: String,

    /**
     * @input {string} Instructional text that shows before the input has a value.
     */
    placeholder: String,

    /**
     * @input {any} The minimum value, which must not be greater than its maximum (max attribute) value.
     */
    min: [String, Number],

    /**
     * @input {any} The maximum value, which must not be less than its minimum (min attribute) value.
     */
    max: [String, Number],

    /**
     * @input {any} Works with the min and max attributes to limit the increments at which a value can be set.
     */
    step: [String, Number]
  },
  computed: {
    inputElement () {
      return this.$refs.input
    }
  },
  watch: {
    value (val) {
      this.currentValue = val
      this.setItemHasValueClass()
    }
  },
  mounted () {
    this.itemComponent && this.itemComponent.setElementClass('item-input', true)

    this.setItemHasValueClass()
  },
  methods: {
    setFocus () {
      if (!hasFocus(this.inputElement)) {
        this.inputElement.focus()
      }
    },
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
    setItemHasFocusClass (isFocus) {
      this.itemComponent && this.itemComponent.setElementClass('input-has-focus', isFocus)
    },

    setItemHasValueClass () {
      this.itemComponent && this.itemComponent.setElementClass('input-has-value', this.hasValue())
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
  @import "input";
  @import "input.ios";
  @import "input.md";
</style>
