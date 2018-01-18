<template>
  <vm-toolbar class="ion-navbar" :color="color">
    <vm-button slot="buttons" v-if="isShowBackButton"
        :class="['back-button','back-button-'+mode,'show-back-button']"
        :icon-only="!backButtonText || mode !=='ios'"
        @click="backButtonClickHandler" >
      <vm-icon v-if="backButtonIcon"
          :class="['back-button-icon','back-button-icon-'+mode]"
          :name="backButtonIcon"></vm-icon>
      <span v-if="backButtonText && mode ==='ios'"
          :class="['back-button-text','back-button-text-'+mode]">{{backButtonText}}</span>
    </vm-button>

    <slot>
      <vm-title v-if="title">{{title}}</vm-title>
    </slot>

    <!--  定义navbar中slot的name，同时指定其为toolbar组件的slot -->
    <slot name="buttons" slot="buttons">
      <vm-buttons end v-if="showMoreButton">
        <vm-button @click="moreButtonClickHandler" :icon-only="!moreButtonText">
          <vm-icon :class="['more-button-icon','more-button-icon-'+mode]" :name="moreButtonIcon" v-if="moreButtonIcon"></vm-icon>
          <span :class="['more-button-text','more-button-text-'+mode]" v-if="moreButtonText" v-text="moreButtonText"></span>
        </vm-button>
      </vm-buttons>
    </slot>
  </vm-toolbar>
</template>

<script>
import { isTrueProperty, isFunction } from '../../util/util'
import ModeMixins from '../../themes/theme.mixins'
import VmToolbar from '../toolbar'
import VmButtons from '../buttons'
import VmIcon from '../icon'
import VmTitle from '../title'
import VmButton from '../button'

export default {
  name: 'vm-navbar',
  mixins: [ModeMixins],
  components: {
    VmToolbar,
    VmButton,
    VmTitle,
    VmIcon,
    VmButtons
  },
  data () {
    return {
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
    this.$el.classList.remove('ion-toolbar')
    this.$nextTick(() => {
      this.refreshBackButtonStatus()
    })
  },
  methods: {
    backButtonClickHandler (ev) {
      ev.preventDefault()
      ev.stopPropagation()

      if (isFunction(this.onBackButtonClick)) {
        if (this.onBackButtonClick(ev) === false) { return }
      }

      this.$router ? this.$router.back() : window.history.back()
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
