<template>
  <vm-header>
    <vm-navbar
        :title="title"
        :color="color"
        :hide-navbar="hideNavbar"
        :hide-back-button="hideBackButton"
        :back-button-icon="backButtonIcon"
        :back-button-text="backButtonText"
        :show-more-button="showMoreButton"
        :more-button-icon="moreButtonIcon"
        :more-button-text="moreButtonText"
        :on-back-button-click="onBackButtonClick"
        :on-more-button-click="onMoreButtonClick">
    </vm-navbar>
  </vm-header>
</template>

<script>
import {isDefined, isTrueProperty} from '../../util/util'
import VmHeader from '../header/index'
import VmNavbar from '../navbar/index'

const NOOP = () => {}

export default {
  name: 'vm-navigation',
  components: {
    VmNavbar,
    VmHeader
  },
  data () {
    return {
      title: '',
      color: '',
      hideNavbar: (this.$config && this.$config.getBoolean('hideNavbar', false)) || false,

      hideBackButton: false,
      backButtonIcon: (this.$config && this.$config.get('backButtonIcon', 'arrow-back')) || 'arrow-back',
      backButtonText: (this.$config && this.$config.get('backButtonText', 'Back')) || 'Back',
      onBackButtonClick: NOOP,

      showMoreButton: false,
      moreButtonIcon: 'more',
      moreButtonText: '',
      onMoreButtonClick: NOOP
    }
  },
  mounted () {
    if (isDefined(this.$options.$data.title)) { this.title = this.$options.$data.title.trim() }
    if (isDefined(this.$options.$data.color)) { this.color = this.$options.$data.color.trim() }
    if (isDefined(this.$options.$data.hideNavbar)) { this.hideNavbar = isTrueProperty(this.$options.$data.hideNavbar) }
    if (isDefined(this.$options.$data.hideBackButton)) { this.hideBackButton = isTrueProperty(this.$options.$data.hideBackButton) }
    if (isDefined(this.$options.$data.backButtonIcon)) { this.backButtonIcon = this.$options.$data.backButtonIcon.trim() }
    if (isDefined(this.$options.$data.backButtonText)) { this.backButtonText = this.$options.$data.backButtonText.trim() }
    if (isDefined(this.$options.$data.onBackButtonClick)) { this.onBackButtonClick = this.$options.$data.onBackButtonClick }

    if (isDefined(this.$options.$data.showMoreButton)) { this.showMoreButton = isTrueProperty(this.$options.$data.showMoreButton) }
    if (isDefined(this.$options.$data.moreButtonIcon)) { this.moreButtonIcon = this.$options.$data.moreButtonIcon.trim() }
    if (isDefined(this.$options.$data.moreButtonText)) { this.moreButtonText = this.$options.$data.moreButtonText.trim() }
    if (isDefined(this.$options.$data.onMoreButtonClick)) { this.onMoreButtonClick = this.$options.$data.onMoreButtonClick }
  }
}
</script>
