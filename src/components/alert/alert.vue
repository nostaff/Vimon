<template>
  <div class="ion-alert" :class="['alert-'+mode, cssClass]" role="dialog" style="z-index: 10010;">
    <vm-backdrop :enableBackdropDismiss="enableBackdropDismiss" :isActive="isActive" @click="bdClick"></vm-backdrop>
    <transition name="ion-alert-fadeup"
        @before-enter="beforeEnter"
        @after-enter="afterEnter"
        @before-leave="beforeLeave"
        @after-leave="afterLeave">
      <div class="alert-wrapper" v-show="isActive">
        <div class="alert-head">
          <h2 class="alert-title">{{title}}</h2>
        </div>
        <!-- alert -->
        <div class="alert-message" v-if="message">{{message}}</div>

        <!-- prompt -->
        <div class="alert-input-group" v-if="inputs && type!=='radio' && type!=='checkbox'">
          <div class="alert-input-wrapper" :key="index" v-for="(input, index) in inputs">
            <input class="alert-input" type="text"
                :ref="input.id"
                :name="input.name"
                :id="input.id"
                :value="input.value"
                :placeholder="input.placeholder">
          </div>
        </div>

        <!-- radio -->
        <div class="alert-radio-group" role="radiogroup" v-if="inputs && type==='radio'">
          <vm-button class="alert-tappable" role="alert-radio" v-for="(input, index) in inputs" :key="index"
              :value="input.value"
              :aria-checked="input.checked"
              :disabled="input.disabled"
              @click="onRadioCheck(input)">
            <div class="alert-radio-icon">
              <div class="alert-radio-inner"></div>
            </div>
            <div class="alert-radio-label">{{input.label}}</div>
          </vm-button>
        </div>

        <!-- checkbox -->
        <div class="alert-checkbox-group" v-if="inputs && type==='checkbox'">
          <vm-button class="alert-tappable" role="alert-checkbox" :key="index" v-for="(input, index) in inputs"
              :value="input.value"
              :aria-checked="input.checked"
              :disabled="input.disabled"
              @click="onCheckboxCheck(input)">
            <div class="alert-checkbox-icon">
              <div class="alert-checkbox-inner"></div>
            </div>
            <div class="alert-checkbox-label">{{input.label}}</div>
          </vm-button>
        </div>

        <!-- buttons -->
        <template v-if="buttons.length > 2">
          <div class="alert-button-group" :key="index" v-for="(button, index) in buttons">
            <vm-button role="alert-button"
                :class="button.cssClass"
                @click="onBtnClick(button)">{{button.text}}</vm-button>
          </div>
        </template>
        <template v-else>
          <div class="alert-button-group">
            <vm-button role="alert-button" v-for="(button, index) in buttons"
                :key="index"
                :class="button.cssClass"
                @click="onBtnClick(button)">{{button.text}}</vm-button>
          </div>
        </template>
      </div>
    </transition>
  </div>
</template>
<script type="text/javascript">
import {isTrueProperty, isString, isFunction} from '../../util/util'
import {urlChange} from '../../util/dom'
import objectAssign from 'object-assign'
import ModeMixins from '../../themes/theme.mixins'
import VmBackdrop from '../backdrop'
import VmButton from '../button'

const NOOP = () => {}

export default {
  name: 'vm-alert',
  mixins: [ModeMixins],
  components: {
    VmButton,
    VmBackdrop
  },
  data () {
    return {
      defaultOptions: {
        type: 'alert',
        title: '',
        message: '',
        cssClass: '',
        enableBackdropDismiss: false,
        dismissOnPageChange: true,
        buttons: []
      },

      type: 'alert',
      title: '',
      message: '',
      inputs: [],
      buttons: [],
      enableBackdropDismiss: false,
      dismissOnPageChange: true,
      cssClass: '',

      dismissCallback: NOOP, // 关闭的回调
      presentCallback: NOOP, // 打开的回调

      enabled: false,
      isActive: false,
      currentValue: ''
    }
  },
  created () {
    let _options = objectAssign({}, this.defaultOptions, this.$options.$data)
    this.type = _options.type
    this.title = _options.title.trim()
    this.message = _options.message.trim()
    this.cssClass = _options.cssClass.trim()
    this.dismissOnPageChange = isTrueProperty(_options.dismissOnPageChange)
    this.enableBackdropDismiss = isTrueProperty(_options.enableBackdropDismiss)

    this.buttons = _options.buttons.map(button => {
      if (isString(button)) { button = {text: button, handler: NOOP} }
      if (!button.cssClass) { button.cssClass = '' }
      if (!isFunction(button.handler)) { button.handler = NOOP }

      return button
    })

    this.inputs = _options.inputs && _options.inputs.map((input, index) => {
      if (isString(input)) {
        input = {label: input, value: input, checked: false}
      }
      if (!input.cssClass) { input.cssClass = '' }
      input.checked = isTrueProperty(input.checked)
      input.disabled = isTrueProperty(input.disabled)
      input.id = `alert-input-${index}`

      if (input.checked === true) {
        this.currentValue = input.value
      }
      return input
    })

    if (this.dismissOnPageChange) {
      this.unReg = urlChange(() => {
        this.isActive && this.dismiss()
      })
    }
  },
  methods: {
    beforeEnter () {
      this.$app && this.$app.setEnabled(false, 200)
      this.enabled = false // 不允许过渡中途操作
    },
    afterEnter () {
      this.presentCallback()
      this.enabled = true
    },
    beforeLeave () {
      this.$app && this.$app.setEnabled(false, 200)
      this.enabled = false
    },
    afterLeave () {
      this.dismissCallback()
      // 移除DOM
      this.$el.remove()
      this.enabled = true
    },

    present () {
      this.isActive = true
      return new Promise((resolve) => {
        this.presentCallback = resolve
      })
    },

    dismiss () {
      if (this.isActive) {
        this.isActive = false
        this.unReg && this.unReg()
        return new Promise((resolve) => {
          this.dismissCallback = resolve
        })
      } else {
        return new Promise((resolve) => {
          resolve()
        })
      }
    },

    bdClick () {
      if (!this.enabled || !this.enableBackdropDismiss) return

      if (this.buttons.length > 0) {
        let cancelBtn = this.buttons.find(b => b.role === 'cancel')
        if (cancelBtn) {
          this.onBtnClick(cancelBtn)
        } else {
          this.dismiss()
        }
      }
    },

    onBtnClick (button) {
      if (!this.enabled) {
        return
      }

      let shouldDismiss = true
      if (isFunction(button.handler)) {
        // a handler has been provided, execute it
        // pass the handler the values from the inputs
        if (button.handler(this.getValues()) === false) {
          // if the return value of the handler is false then do not dismiss
          shouldDismiss = false
        }
      }

      if (shouldDismiss) {
        this.dismiss()
      }
    },

    onRadioCheck (checkedInput) {
      if (checkedInput.disabled) return
      this.inputs.forEach(input => {
        input.checked = (checkedInput === input)
      })
      if (isFunction(checkedInput.handler)) {
        checkedInput.handler(checkedInput)
      }
    },

    onCheckboxCheck (checkedInput) {
      if (checkedInput.disabled) return
      checkedInput.checked = !checkedInput.checked
      if (isFunction(checkedInput.handler)) {
        checkedInput.handler(checkedInput)
      }
    },

    getValues () {
      if (!this.inputs) return
      if (this.type === 'radio' && this.inputs.length > 0) {
        // this is an alert with radio buttons (single value select)
        // return the one value which is checked, otherwise undefined
        const checkedInput = this.inputs.find(i => i.checked)
        return checkedInput ? checkedInput.value : undefined
      }

      if (this.type === 'checkbox' && this.inputs.length > 0) {
        // this is an alert with checkboxes (multiple value select)
        // return an array of all the checked values
        return this.inputs.filter(i => i.checked).map(i => i.value.toString().trim())
      }

      // this is an prompt, return an object of all the values
      const values = {}
      this.inputs.forEach(i => {
        let _$id = this.$refs[i.id][0]
        if (_$id && _$id.value) {
          values[i.name] = _$id.value.toString().trim()
        } else {
          values[i.name] = null
        }
      })
      return values
    }
  }
}
</script>

<style lang="scss">
  @import 'alert';
  @import 'alert.ios';
  @import 'alert.md';
  @import "../../transition/alert";
</style>
