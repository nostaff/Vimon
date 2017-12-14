<template>
  <ion-header v-show="activated">
    <ion-navbar
          :title="title"

          :hide-back-button="hideBackButton"
          :back-button-icon="backButtonIcon"
          :back-button-text="backButtonText"

          :show-more-button="showMoreButton"
          :more-button-icon="moreButtonIcon"
          :more-button-text="moreButtonText"
          @onBackButtonClick="onBackButtonClick"
          @onMoreButtonClick="onMoreButtonClick">
    </ion-navbar>
  </ion-header>
</template>

<script>
import IonHeader from '../components/header'
import IonNavbar from '../components/navbar'

const NOOP = () => {}

export default {
  name: 'ion-navigation',
  components: {
    IonNavbar,
    IonHeader
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
