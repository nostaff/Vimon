<template>
  <div class="ion-navbar" :class="[modeClass, colorClass]">
    <div class="toolbar-background" :class="['toolbar-background-'+mode]"></div>
    <slot name="item-start">
      <vm-button start role="bar-button" :class="['back-button','back-button-'+mode,'show-back-button']" :icon-only="!backButtonText" @click="backButtonClickHandler" v-if="isShowBackButton">
        <vm-icon :class="['back-button-icon','back-button-icon-'+mode]" :name="backButtonIcon" v-if="backButtonIcon"></vm-icon>
        <span :class="['back-button-text','back-button-text-'+mode]" v-if="backButtonText && mode ==='ios'" v-text="backButtonText"></span>
      </vm-button>
    </slot>
    <slot name="item-end">
      <vm-buttons end v-if="showMoreButton">
        <vm-button :icon-only="!moreButtonText" @click="moreButtonClickHandler">
          <vm-icon :class="['more-button-icon','more-button-icon-'+mode]" :name="moreButtonIcon" v-if="moreButtonIcon"></vm-icon>
          <span :class="['more-button-text','more-button-text-'+mode]" v-if="moreButtonText" v-text="moreButtonText"></span>
        </vm-button>
      </vm-buttons>
    </slot>
    <div class="toolbar-content" :class="['toolbar-content-'+mode]">
      <slot>
        <vm-title v-if="title">{{title}}</vm-title>
      </slot>
    </div>
  </div>
</template>

<script>
import { isTrueProperty, isFunction } from '../../util/util'
import ModeMixins from '../../themes/theme.mixins'
import VmButtons from '../buttons'
import VmIcon from '../icon'
import VmTitle from '../title'
import VmButton from '../button'

export default {
  name: 'vm-navbar',
  mixins: [ModeMixins],
  components: {
    VmButton,
    VmTitle,
    VmIcon,
    VmButtons
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
        if (this.onBackButtonClick(ev) === false) { return }
      }

      // let root = document.querySelector('.ion-app')
      // if (root) root.setAttribute('transition-direction', 'back')
      window.history.back()
    },
    moreButtonClickHandler (ev) {
      console.log(ev, this.onMoreButtonClick)
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
      console.log(this.showMoreButton)
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
