<template>
  <div class="ion-alert alert-top" :class="['alert-'+mode, cssClass]" role="dialog" style="z-index: 9999;">
    <ion-backdrop :enableBackdropDismiss="enableBackdropDismiss" :isActive="activated" @click.native="bdClick()"></ion-backdrop>
    <transition name="ion-alert-fadeup">
      <div class="alert-wrapper" v-show="activated">
        <div class="alert-head">
          <h2 class="alert-title">{{ title }}</h2>
        </div>
        <div class="alert-message">
          {{ message }}
        </div>
        <div class="alert-input-group" v-if="inputs">
          <div class="alert-input-wrapper" :key="index" v-for="(input, index) in inputs">
            <input class="alert-input" type="text" :name="input.name" :placeholder="input.title" :value="input.value" @input="inputChanged($event)">
          </div>
        </div>
        <div class="alert-button-group">
          <ion-button role="alert-button" :key="index" v-for="(button, index) in buttons" :class="button.cssClass" @click.native="dismiss(index)">{{button.text}}
          </ion-button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { isTrueProperty } from '../../util/util'
import { urlChange } from '../../util/dom'
import objectAssign from 'object-assign'
import ModeMixins from '../../themes/theme.mixins'
import IonBackdrop from '../backdrop'
import IonButton from '../button'
export default {
  name: 'ion-prompt',
  mixins: [ModeMixins],
  components: {
    IonButton,
    IonBackdrop
  },
  data () {
    return {
      defaultOptions: {
        title: '',
        message: '',
        inputs: [{ name: 'title', placeholder: 'Title' }],
        buttons: [{ text: 'Cancel' }, { text: 'Save' }]
      },

      message: '',
      inputs: [],
      buttons: [],
      enableBackdropDismiss: true,
      dismissOnPageChange: true,
      cssClass: '',

      activated: false,
      values: []
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
      this.message = _options.message
      this.cssClass = _options.cssClass
      this.dismissOnPageChange = isTrueProperty(_options.dismissOnPageChange)
      this.enableBackdropDismiss = isTrueProperty(
        _options.enableBackdropDismiss
      )

      let that = this
      this.buttons = _options.buttons.filter(button => {
        if (typeof button === 'string') {
          button = { text: button }
        }
        if (!button.cssClass) {
          button.cssClass = ''
        }
        return button
      })

      this.inputs = _options.inputs.filter(input => {
        if (typeof button === 'string') {
          input = { title: input, name: input }
        }
        if (!input.cssClass) {
          input.cssClass = ''
        }
        if (input.value) {
          that.values[input.name] = input.value
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
          handler(this.values)
        }
      }

      // 返回输入框的值
      this.$emit('onHideEvent', { index: buttonIndex, values: this.values })
      setTimeout(() => {
        this.$el.remove()
      }, 400)
    },

    bdClick () {
      if (this.enableBackdropDismiss) {
        this.dismiss(-1)
      }
    },

    inputChanged ($event) {
      let value = $event.target.value
      let name = $event.target.name

      this.values[name] = value
    }
  }
}
</script>

<style lang="scss">
@import "alert";
@import "alert.ios";
@import "alert.md";
</style>
