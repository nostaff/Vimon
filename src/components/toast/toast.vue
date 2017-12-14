<template>
  <div role="dialog" :class="['ion-toast', modeClass, cssClass]" :style="{'z-index': zIndex}">
    <transition :name="'toast-fade-'+position">
      <div class="toast-wrapper" :class="['toast-'+position]" v-show="activated">
        <div class="toast-container">
          <div class="toast-message" v-if="message">{{message}}</div>
          <ion-button class="toast-button" clear v-if="showCloseButton" @click.native="closeButtonClick()">{{closeButtonText}}</ion-button>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
  import {urlChange} from '../../util/dom'
  import {isFunction, isNumber, isTrueProperty} from '../../util/util'
  import objectAssign from 'object-assign'
  import ModeMixins from '../../themes/theme.mixins'
  import IonButton from '../button'

  let zIndex = 20001
  export default {
    name: 'ion-toast',
    mixins: [ModeMixins],
    components: {
      IonButton
    },
    data () {
      return {
        defaultOptions: {
          message: '',
          closeButtonText: 'OK',
          showCloseButton: false,
          dismissOnPageChange: true,
          duration: 3000,
          position: 'bottom', // "top", "middle", "bottom"
          cssClass: '',
          onDismiss: () => {
          }
        },

        message: '',
        closeButtonText: 'OK',
        showCloseButton: false,
        dismissOnPageChange: true,
        duration: 3000,
        position: 'bottom',
        cssClass: '',
        onDismiss: () => {
        },

        activated: false,
        timer: null,

        zIndex: this.getZIndex()
      }
    },
    created () {
      if (this.dismissOnPageChange) {
        urlChange(() => {
          if (this.activated) {
            if (this.showCloseButton) {
              this.closeButtonClick()
            } else if (this.timer) {
              window.clearTimeout(this.timer)
              this.timer = null
              this.dismiss(-1)
            }
          }
        })
      }
    },

    methods: {
      getZIndex () {
        return zIndex++
      },
      present (options) {
        let _options = objectAssign({}, this.defaultOptions, options)
        this.message = _options.message
        this.closeButtonText = _options.closeButtonText
        this.cssClass = _options.cssClass
        this.showCloseButton = isTrueProperty(_options.showCloseButton)
        this.dismissOnPageChange = isTrueProperty(_options.dismissOnPageChange)
        if (['top', 'middle', 'bottom'].indexOf(_options.position) > -1) {
          this.position = _options.position
        }
        if (isNumber(_options.duration)) {
          this.duration = _options.duration
        }
        if (isFunction(_options.onDismiss)) {
          this.onDismiss = _options.onDismiss
        }

        this.activated = true
        if (!this.showCloseButton) {
          this.timer = window.setTimeout(() => {
            this.timer = null
            this.dismiss(-1)
          }, this.duration)
        }

        return new Promise((resolve, reject) => {
          this.$on('onDismissEvent', (res) => {
            resolve(res)
          })
        })
      },

      dismiss (role) {
        this.onDismiss && this.onDismiss(role)

        this.$nextTick(() => {
          this.$emit('onDismissEvent', role)

          this.$el.remove()
        })
      },

      closeButtonClick () {
        this.dismiss(-1)
      }
    }
  }
</script>

<style lang="scss">
  @import 'toast';
  @import 'toast.ios';
  @import 'toast.md';
  @import "../../transition/toast";
</style>
