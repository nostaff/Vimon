<template>
  <div class="ion-navbar" :class="[modeClass, colorClass]">
    <div class="toolbar-background" :class="['toolbar-background-'+mode]"></div>
    <slot name="item-start">
      <ion-button role="bar-button" :class="['back-button','back-button-'+mode,'show-back-button']" :icon-only="!backButtonText" @click.native="backButtonClickHandler" v-if="isShowBackButton">
        <ion-icon :class="['back-button-icon','back-button-icon-'+mode]" :name="backButtonIcon" v-if="backButtonIcon"></ion-icon>
        <span :class="['back-button-text','back-button-text-'+mode]" v-if="backButtonText && mode ==='ios'" v-text="backButtonText"></span>
      </ion-button>
    </slot>
    <slot name="item-end">
      <ion-buttons v-if="showMoreButton">
        <ion-button :icon-only="!moreButtonText" @click.native="moreButtonClickHandler">
          <ion-icon :class="['more-button-icon','more-button-icon-'+mode]" :name="moreButtonIcon" v-if="moreButtonIcon"></ion-icon>
          <span :class="['more-button-text','more-button-text-'+mode]" v-if="moreButtonText" v-text="moreButtonText"></span>
        </ion-button>
      </ion-buttons>
    </slot>
    <div class="toolbar-content" :class="['toolbar-content-'+mode]">
      <slot>
        <ion-title v-if="title">{{title}}</ion-title>
      </slot>
    </div>
  </div>
</template>

<script>
import { isTrueProperty, isFunction } from '../../util/util'
import ModeMixins from '../../themes/theme.mixins'
import IonButtons from '../buttons'
import IonIcon from '../icon'
import IonTitle from '../title'
import IonButton from '../button'

export default {
  name: 'ion-navbar',
  mixins: [ModeMixins],
  components: {
    IonButton,
    IonTitle,
    IonIcon,
    IonButtons
  },
  data () {
    return {
      roleName: 'toolbar',
      isShowBackButton: !isTrueProperty(this.hideBackButton)
    }
  },
  props: {
    title: String,

    hideBackButton: {
      type: Boolean,
      default: false
    },
    backButtonIcon: {
      type: String,
      default: (this.$config && this.$config.get('backButtonIcon', 'arrow-back')) || 'arrow-back'
    },
    backButtonText: {
      type: String,
      default: (this.$config && this.$config.get('backButtonText', 'Back')) || 'Back'
    },
    onBackButtonClick: Function,

    showMoreButton: {
      type: Boolean,
      default: false
    },
    moreButtonIcon: {
      type: String,
      default: 'more'
    },
    moreButtonText: {
      type: String,
      default: ''
    },
    onMoreButtonClick: Function
  },
  mounted () {
    if (this.$slots['item-start']) {
      this.$slots['item-start'].forEach(function (item) {
        item.elm.setAttribute('start', '')
      })
    }

    if (this.$slots['item-end']) {
      this.$slots['item-end'].forEach(function (item) {
        item.elm.setAttribute('end', '')
      })
    }

    this.refreshBackButtonStatus()
  },
  methods: {
    backButtonClickHandler (ev) {
      ev.preventDefault()
      ev.stopPropagation()

      if (isFunction(this.onBackButtonClick)) {
        return this.onBackButtonClick(ev)
      }

      // let root = document.querySelector('.ion-app')
      // if (root) root.setAttribute('transition-direction', 'back')
      window.history.back()
    },
    moreButtonClickHandler (ev) {
      ev.preventDefault()
      ev.stopPropagation()

      if (isFunction(this.onMoreButtonClick)) {
        this.onMoreButtonClick(ev)
      }
    },

    /**
     * 手动设置是否显示后退按钮
     * @private
     **/
    refreshBackButtonStatus () {
      this.isShowBackButton = this.$history.canGoBack() && !isTrueProperty(this.hideBackButton)
    }
  }
}
</script>

<style lang="scss">
@import "../toolbar/toolbar";
@import "../toolbar/toolbar.ios";
@import "../toolbar/toolbar.md";
</style>
