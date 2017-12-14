<template>
  <div class="ion-alert" :class="['alert-'+mode, cssClass]" role="dialog" style="z-index: 9999;">
    <vm-backdrop :enableBackdropDismiss="enableBackdropDismiss" :isActive="activated" @click.native="bdClick()"></vm-backdrop>
    <transition name="ion-alert-fadeup">
      <div class="alert-wrapper" v-show="activated">
        <div class="alert-head">
          <h2 class="alert-title">{{title}}</h2>
        </div>
        <div class="alert-checkbox-group">
          <vm-button class="alert-tappable" role="alert-checkbox" :key="index" v-for="(input, index) in inputs"
                      :value="input.value"
                      :aria-checked="getChecked(input.value)"
                      :disabled="input.disabled"
                      @click.native="onCheck(input.value, input.disabled)
                           ">
            <div class="alert-checkbox-icon">
              <div class="alert-checkbox-inner"></div>
            </div>
            <div class="alert-checkbox-label">{{input.label}}</div>
          </vm-button>
        </div>
        <div class="alert-button-group">
          <vm-button role="alert-button" :key="index" v-for="(button, index) in buttons"
                      :class="button.cssClass" @click.native="dismiss(index)">
            {{button.text}}
          </vm-button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import {isTrueProperty} from '../../util/util'
  import {urlChange} from '../../util/dom'
  import objectAssign from 'object-assign'
  import ModeMixins from '../../themes/theme.mixins'
  import VmBackdrop from '../backdrop'
  import VmButton from '../button'

  export default {
    name: 'vm-alert-checkbox',
    mixins: [ModeMixins],
    components: {
      VmButton,
      VmBackdrop
    },
    data () {
      return {
        defaultOptions: {
          title: '',
          inputs: [{label: 'title', value: 'Title'}],
          buttons: [{text: 'Cancel'}, {text: 'Save'}]
        },

        inputs: [],
        buttons: [],
        enableBackdropDismiss: true,
        dismissOnPageChange: true,
        cssClass: '',

        activated: false,
        currentValue: []
      }
    },
    created () {
      if (this.dismissOnPageChange) {
        urlChange(() => {
          this.activated && this.dismiss(-1)
        })
      }
    },
    methods: {
      present (options) {
        let _options = objectAssign({}, this.defaultOptions, options)
        this.title = _options.title
        this.cssClass = _options.cssClass
        this.dismissOnPageChange = isTrueProperty(_options.dismissOnPageChange)
        this.enableBackdropDismiss = isTrueProperty(_options.enableBackdropDismiss)

        this.buttons = _options.buttons.filter(button => {
          if (typeof button === 'string') {
            button = {text: button}
          }
          if (!button.cssClass) {
            button.cssClass = ''
          }
          return button
        })

        this.inputs = _options.inputs.filter(input => {
          if (typeof button === 'string') {
            input = {label: input, value: input}
          }
          if (!input.cssClass) {
            input.cssClass = ''
          }
          if (input.checked === true || input.checked === 'true') {
            this.currentValue.push(input.value)
          }
          return input
        })

        this.activated = true

        return new Promise((resolve, reject) => {
          this.$on('onHideEvent', data => {
            resolve(data)
          })
        })
      },

      dismiss (buttonIndex) {
        this.activated = false

        if (buttonIndex > -1) {
          let handler = this.buttons[buttonIndex].handler
          if (handler && typeof handler === 'function') {
            handler(this.currentValue)
          }
        }

        // 返回输入框的值
        this.$emit('onHideEvent', {index: buttonIndex, value: this.currentValue})
        setTimeout(() => {
          this.$el.remove()
        }, 400)
      },

      bdClick () {
        if (this.enableBackdropDismiss) {
          this.dismiss(-1)
        }
      },

      getChecked (val) {
        return this.currentValue.indexOf(val) !== -1
      },

      onCheck (val, disabled) {
        if (disabled) return
        let index = this.currentValue.indexOf(val)

        if (index === -1) {
          this.currentValue.push(val)
        } else {
          this.currentValue.splice(index, 1)
        }
        this.currentValue.sort()
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
