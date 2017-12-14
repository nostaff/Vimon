<template>
  <div role="dialog" :class="['ion-action-sheet', modeClass, cssClass]" style="z-index: 10001;">
    <ion-backdrop @click.native="bdClick()" :enableBackdropDismiss="enableBackdropDismiss" :isActive="activated"></ion-backdrop>
    <transition name="action-sheet-fade"
        @before-enter="beforeEnter"
        @after-enter="afterEnter"
        @before-leave="beforeLeave"
        @after-leave="afterLeave">
      <div class="action-sheet-wrapper" v-show="activated">
        <div class="action-sheet-container">
          <div class="action-sheet-group">
            <div class="action-sheet-title">
              <span>{{title}}</span>
              <div class="action-sheet-sub-title">{{subTitle}}</div>
            </div>
            <ion-button role="action-sheet-button" :key="index" v-for="(button, index) in buttons" :disabled="button.disabled" :class="button.cssClass" @click.native="dismiss(index, button.disabled)">
              <ion-icon class="action-sheet-icon icon" :name="button.icon" v-if="button.icon"></ion-icon>
              {{button.text}}
            </ion-button>
          </div>
          <div class="action-sheet-group">
            <ion-button role="action-sheet-button" class="action-sheet-cancel" :class="cancelButton.cssClass" :disabled="cancelButton.disabled" @click.native="dismiss(-1, cancelButton.disabled)">
              <ion-icon class="action-sheet-icon icon" :name="cancelButton.icon" v-if="cancelButton.icon"></ion-icon>
              {{cancelButton.text}}
            </ion-button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import {urlChange, focusOutActiveElement} from '../../util/dom'
import objectAssign from 'object-assign'
import ModeMixins from '../../themes/theme.mixins'
import IonBackdrop from '../backdrop'
import IonButton from '../button'
import IonIcon from '../icon'

export default {
  name: 'ion-action-sheet',
  mixins: [ModeMixins],
  components: {
    IonButton,
    IonBackdrop,
    IonIcon
  },
  data () {
    return {
      defaultOptions: {
        title: '',
        subTitle: '',
        buttons: []
      },
      title: '',
      subTitle: '',
      cssClass: '',
      buttons: [],
      enableBackdropDismiss: true,

      cancelButton: {},
      activated: false,
      dismissOnPageChange: true
    }
  },
  created () {
    this.init()
    // mounted before data ready, so no need to judge the `dismissOnPageChange` value
    if (this.dismissOnPageChange) {
      this.unReg = urlChange(() => {
        this.isActive && this.dismiss()
      })
    }
  },
  methods: {
    beforeEnter () {
      this.enabled = false // 不允许过渡中途操作
      this.$app && this.$app.setEnabled(false, 400)
    },
    afterEnter () {
      this.presentCallback()
      focusOutActiveElement()
      let focusableEle = document.querySelector('button')
      if (focusableEle) {
        focusableEle.focus()
      }
      this.enabled = true
    },
    beforeLeave () {
      this.enabled = false
      this.$app && this.$app.setEnabled(false, 400)
    },
    afterLeave () {
      this.dismissCallback()
      // 删除DOM
      this.$el.remove()
      this.enabled = true
    },
    present (options) {
      let _options = objectAssign({}, this.defaultOptions, options)
      this.title = _options.title
      this.subTitle = _options.subTitle
      if (typeof _options.cssClass === 'string') {
        this.cssClass = _options.cssClass.trim()
      }
      if (typeof _options.enableBackdropDismiss === 'boolean') {
        this.enableBackdropDismiss = _options.enableBackdropDismiss
      }

      this.buttons = _options.buttons.filter(button => {
        if (typeof button === 'string') {
          button = { text: button }
        }
        if (!button.cssClass) {
          button.cssClass = ''
        }
        switch (button.role) {
          case 'cancel':
            this.cancelButton = button
            return null
          case 'destructive':
            button.cssClass = (button.cssClass + ' ' || '') + 'action-sheet-destructive'
            break
          case 'selected':
            button.cssClass = (button.cssClass + ' ' || '') + 'action-sheet-selected'
            break
        }
        return button
      })

      this.activated = true

      return new Promise((resolve, reject) => {
        this.$on('onDismissEvent', buttonIndex => {
          resolve(buttonIndex)
        })
      })
    },

    dismiss (buttonIndex, disabled) {
      if (disabled) return
      this.activated = false

      if (buttonIndex === -1 && typeof this.cancelButton.handler === 'function') {
        this.cancelButton.handler()
      }
      if (buttonIndex > -1) {
        let handler = this.buttons[buttonIndex].handler
        if (handler && typeof handler === 'function') {
          handler()
        }
      }

      this.$emit('onDismissEvent', buttonIndex)

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
@import "action-sheet";
@import "action-sheet.ios";
@import "action-sheet.md";
@import "../../transition/action-sheet";
</style>
