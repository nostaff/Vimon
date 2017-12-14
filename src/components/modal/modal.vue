<template>
  <div class="ion-modal show-page" :class="[modeClass, cssClass]" role="dialog" style="z-index: 10010;">
    <ion-backdrop :enableBackdropDismiss="enableBackdropDismiss"
                  v-if="showBackdrop"
                  v-show="activated"
                  @click.native="bdClick"></ion-backdrop>
    <transition name="modal-fade">
      <div class="modal-wrapper" v-show="activated">
        <div class="modal-viewport" ref="viewPort"></div>
      </div>
    </transition>
  </div>
</template>
<script>
  import {isFunction, isTrueProperty} from '../../util/util'
  import {urlChange} from '../../util/dom'
  import objectAssign from 'object-assign'
  import ModeMixins from '../../themes/theme.mixins'
  import IonBackdrop from '../backdrop'

  export default {
    name: 'ion-modal',
    mixins: [ModeMixins],
    components: {
      IonBackdrop
    },
    data () {
      return {
        defaultOptions: {
          component: null,
          data: {},
          showBackdrop: true,
          enableBackdropDismiss: true,
          onDismiss: () => {
          }
        },

        component: null,
        data: {},

        showBackdrop: true,
        enableBackdropDismiss: true,
        dismissOnPageChange: true,
        cssClass: '',
        onDismiss: () => {
        },

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
        // Sync to sub component
        this.component = _options.component
        this.data = _options.data

        this.cssClass = _options.cssClass
        this.showBackdrop = isTrueProperty(_options.showBackdrop)
        this.dismissOnPageChange = isTrueProperty(_options.dismissOnPageChange)
        this.enableBackdropDismiss = isTrueProperty(_options.enableBackdropDismiss)
        if (isFunction(_options.onDismiss)) {
          this.onDismiss = _options.onDismiss
        }

        this.activated = true

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

      bdClick () {
        if (this.enableBackdropDismiss) {
          this.dismiss(-1)
        }
      }
    }
  }
</script>

<style lang="scss">
  @import 'modal';
  @import 'modal.ios';
  @import 'modal.md';
  @import "../../transition/modal";
</style>
