<template>
  <vm-header v-show="activated">
    <vm-navbar
          :title="title"

          :hide-back-button="hideBackButton"
          :back-button-icon="backButtonIcon"
          :back-button-text="backButtonText"

          :show-more-button="showMoreButton"
          :more-button-icon="moreButtonIcon"
          :more-button-text="moreButtonText"
          @onBackButtonClick="onBackButtonClick"
          @onMoreButtonClick="onMoreButtonClick">
    </vm-navbar>
  </vm-header>
</template>

<script>
import VmHeader from '../components/header'
import VmNavbar from '../components/navbar'

const NOOP = () => {}

export default {
  name: 'vm-navigation',
  components: {
    VmNavbar,
    VmHeader
  },
  data () {
    return {
      activated: true,
      title: '',

      hideBackButton: false,
      backButtonIcon: (this.$config && this.$config.get('backButtonIcon', 'arrow-back')) || 'arrow-back',
      backButtonText: (this.$config && this.$config.get('backButtonText', 'Back')) || 'Back',
      onBackButtonClick: NOOP,

      showMoreButton: false,
      moreButtonIcon: 'more',
      moreButtonText: '',
      onMoreButtonClick: NOOP
    }
  }
}
</script>
