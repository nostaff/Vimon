<template>
  <div class="ion-alert" :class="['alert-'+mode, cssClass]" role="dialog" style="z-index: 10010;">
    <ion-backdrop :enableBackdropDismiss="enableBackdropDismiss" :isActive="activated" @click.native="bdClick()"></ion-backdrop>
    <transition name="ion-alert-fadeup">
      <div class="alert-wrapper" v-show="activated">
        <div class="alert-head">
          <h2 class="alert-title">{{ title }}</h2>
        </div>
        <div class="alert-message">
          {{ message }}
        </div>
        <template v-if="buttons.length > 2">
          <div class="alert-button-group" :key="index" v-for="(button, index) in buttons">
            <ion-button role="alert-button" :class="button.cssClass" @click.native="dismiss(index)">{{button.text}}</ion-button>
          </div>
        </template>
        <template v-else>
          <div class="alert-button-group">
            <ion-button role="alert-button" :key="index" v-for="(button, index) in buttons" :class="button.cssClass" @click.native="dismiss(index)">{{button.text}}</ion-button>
          </div>
        </template>
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
    name: 'ion-alert',
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
          buttons: [{text: 'OK'}]
        },

        message: '',
        buttons: [],
        enableBackdropDismiss: true,
        dismissOnPageChange: true,
        cssClass: '',

        activated: false
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

        this.activated = true

        return new Promise((resolve, reject) => {
          this.$on('onHideEvent', (res) => {
            resolve(res)
          })
        })
      },

      dismiss (buttonIndex) {
        this.activated = false

        if (buttonIndex > -1) {
          let handler = this.buttons[buttonIndex].handler
          if (handler && typeof handler === 'function') {
            handler()
          }
        }

        this.$emit('onHideEvent', buttonIndex)
        setTimeout(() => {
          this.$el.remove()
        }, 400)
      },

      bdClick () {
        if (this.enableBackdropDismiss) {
          this.dismiss(-1)
        }
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
