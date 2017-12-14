<template>
  <div class="ion-alert" :class="['alert-'+mode, cssClass]" role="dialog" style="z-index: 9999;">
    <ion-backdrop :enableBackdropDismiss="enableBackdropDismiss" :isActive="activated" @click.native="bdClick()"></ion-backdrop>
    <transition name="ion-alert-fadeup">
      <div class="alert-wrapper" v-show="activated">
        <div class="alert-head">
          <h2 class="alert-title">{{title}}</h2>
        </div>
        <div class="alert-radio-group" role="radiogroup">
          <ion-button class="alert-tappable" role="alert-radio" :key="index" v-for="(input, index) in inputs"
                      :value="input.value"
                      :aria-checked="input.value === currentValue"
                      :disabled="input.disabled"
                      @click.native="onCheck(input.value, input.disabled)
                           ">
            <div class="alert-radio-icon">
              <div class="alert-radio-inner"></div>
            </div>
            <div class="alert-radio-label">{{input.label}}</div>
          </ion-button>
        </div>
        <div class="alert-button-group">
          <ion-button role="alert-button" :key="index" v-for="(button, index) in buttons"
                      :class="button.cssClass" @click.native="dismiss(index)">
            {{button.text}}
          </ion-button>
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
  import IonBackdrop from '../backdrop'
  import IonButton from '../button'

  export default {
    name: 'ion-alert-radio',
    mixins: [ModeMixins],
    components: {
      IonButton,
      IonBackdrop
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
        currentValue: ''
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
            input = {label: input, value: input, checked: false}
          }
          if (!input.cssClass) {
            input.cssClass = ''
          }
          if (input.checked === true || input.checked === 'true') {
            this.currentValue = input.value
          }
          return input
        })

        this.activated = true

        return new Promise((resolve, reject) => {
          this.$events.$on('onHideEvent', data => {
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

      onCheck (value, disabled) {
        if (disabled) {
          return
        }
        this.currentValue = value
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
