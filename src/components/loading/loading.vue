<template>
  <div class="ion-loading" :class="[modeClass, cssClass]" role="dialog">
    <ion-backdrop :enableBackdropDismiss="enableBackdropDismiss" :isActive="activated" v-if="showBackdrop" @click.native="bdClick()"></ion-backdrop>
    <transition name="loading-fade">
      <div class="loading-wrapper" v-show="activated">
        <div v-if="spinner" class="loading-spinner">
          <ion-spinner :name="spinner"></ion-spinner>
        </div>
        <div v-if="content" v-html="content" class="loading-content"></div>
      </div>
    </transition>
  </div>
</template>
<script>
import objectAssign from 'object-assign'
import ModeMixins from '../../themes/theme.mixins'
import IonBackdrop from '../backdrop'
import IonSpinner from '../spinner'

export default {
  name: 'ion-loading',
  mixins: [ModeMixins],
  components: {
    IonBackdrop,
    IonSpinner
  },
  data () {
    return {
      defaultOptions: {
        content: '',
        showBackdrop: true,
        enableBackdropDismiss: false
      },

      content: '',
      spinner: '',
      showBackdrop: true,
      enableBackdropDismiss: false,
      duration: 3000,
      cssClass: '',

      activated: false
    }
  },
  methods: {
    present (options) {
      let _options = objectAssign({}, this.defaultOptions, options)
      this.content = _options.content
      this.spinner = _options.spinner

      this.duration = parseInt(_options.duration)
      if (typeof _options.showBackdrop === 'boolean') {
        this.showBackdrop = _options.showBackdrop
      }
      if (typeof _options.enableBackdropDismiss === 'boolean') {
        this.enableBackdropDismiss = _options.enableBackdropDismiss
      }

      this.activated = true

      if (this.duration) {
        setTimeout(() => this.dismiss('backdrop'), this.duration)
      }

      return new Promise((resolve, reject) => {
        this.$on('onHideEvent', res => {
          resolve(res)
        })
      })
    },

    dismiss (role) {
      this.activated = false

      this.$emit('onHideEvent', role)
      setTimeout(() => {
        this.$el.remove()
      }, 200)
    },

    bdClick () {
      if (this.enableBackdropDismiss) {
        this.dismiss('backdrop')
      }
    }
  }
}
</script>

<style lang="scss">
@import "loading";
@import "loading.ios";
@import "loading.md";
@import "../../transition/loading";
</style>
