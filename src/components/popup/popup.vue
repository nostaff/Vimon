<template>
  <div role="dialog" class="ion-popup" :class="[modeClass, cssClass]" style="z-index: 9999;">
    <ion-backdrop @click.native="bdClick()" :isActive="activated"></ion-backdrop>
    <transition name="popup-fade">
      <div class="popup-wrapper" v-show="activated">
        <div class="popup-toolbar" v-if="buttons">
          <div v-for="(button, index) in buttons" :key="index" class="popup-toolbar-button" :class="button.cssRole">
            <ion-button @click.native="btnClick(button)" :class="button.cssClass" class="popup-button" clear>
              {{button.text}}
            </ion-button>
          </div>
        </div>
        <div v-if="title" class="popup-head">
          <div class="popup-title" v-html="title"></div>
        </div>

        <div class="popup-body" :class="{'no-content': state == 0}">
          <slot></slot>
          <ion-button v-if="showClose == 'true'" @click.native="dismiss(-1)">
            <i class="ion-ios-close-empty"></i>
          </ion-button>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
  import ModeMixins from '../../themes/theme.mixins'
  import IonBackdrop from '../backdrop'
  import IonButton from '../button'

  export default {
    name: 'ion-popup',
    mixins: [ModeMixins],
    components: {
      IonButton,
      IonBackdrop
    },
    props: {
      effect: {
        type: String,
        default: 'default'
      },
      title: {
        type: String,
        default: ''
      },
      cssClass: {
        type: String,
        default: ''
      },
      showClose: {
        type: String,
        default: 'false'
      }
    },

    data () {
      return {
        state: 0, // 0: hidden, 1: showing, 2: active
        buttons: [],
        activated: false,
        enableBackdropDismiss: true
      }
    },

    mounted () {
      if (this.cssClass) {
        this.$el.querySelector('.ion-popup').classList.add(this.cssClass)
      }
    },

    methods: {
      present () {
        this.activated = true

        return new Promise((resolve, reject) => {
          this.$on('onDismissEvent', (data) => {
            resolve(data)
          })
        })
      },

      setButtons (buttons) {
        this.buttons = buttons
      },

      btnClick (button) {
        let shouldDismiss = true

        if (button.handler && typeof button.handler === 'function') {
          // a handler has been provided, execute it
          // pass the handler the values from the inputs
          if (button.handler(this.getSelected()) === false) {
            // if the return value of the handler is false then do not dismiss
            shouldDismiss = false
          }
        }

        if (shouldDismiss) {
          this.dismiss(button.role)
        }
      },

      bdClick () {
        if (this.enableBackdropDismiss) {
          this.dismiss('backdrop')
        }
      },

      dismiss (role) {
        this.activated = false

        this.$emit('onDismissEvent', {role: role})

        setTimeout(() => {
          this.$el.remove()
        }, 300)
      }
    }
  }
</script>

<style lang="scss">
  @import 'popup';
  @import 'popup.ios';
  @import 'popup.md';
  @import "../../transition/popup";
</style>
