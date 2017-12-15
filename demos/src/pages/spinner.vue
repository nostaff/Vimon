<template>
  <vm-page v-nav="{title: 'Spinner'}">

    <vm-content class="outer-content">

      <vm-list>
        <vm-list-header>
          Spinner Loading Indicators
        </vm-list-header>
        <vm-item @click="presentLoadingIos()">
          <vm-spinner slot="item-start" name="ios"></vm-spinner>
          Show iOS
        </vm-item>
        <vm-item @click="presentLoadingDots()">
          <vm-spinner slot="item-start" name="dots"></vm-spinner>
          Show Dots
        </vm-item>
        <vm-item @click="presentLoadingBubbles()">
          <vm-spinner slot="item-start" name="bubbles"></vm-spinner>
          Show Bubbles
        </vm-item>
        <vm-item @click="presentLoadingCircles()">
          <vm-spinner slot="item-start" name="circles"></vm-spinner>
          Show Circles
        </vm-item>
        <vm-item @click="presentLoadingCrescent()">
          <vm-spinner slot="item-start" name="crescent"></vm-spinner>
          Show Crescent
        </vm-item>
        <vm-item @click="presentLoadingDefault()">
          <vm-spinner slot="item-start"></vm-spinner>
          Show Default
        </vm-item>
      </vm-list>

      <vm-list>
        <vm-list-header>
          Custom Loading Indicators
        </vm-list-header>
        <vm-item @click="presentLoadingCustom()">
          Show Custom
        </vm-item>
        <vm-item @click="presentLoadingText()">
          Show Text Only
        </vm-item>
      </vm-list>

    </vm-content>

  </vm-page>
</template>

<script>
export default {
  methods: {
    presentLoadingIos () {
      this.$loading.present({
        spinner: 'ios',
        content: 'This is the "ios" spinner. It will dismiss after 3 seconds.',
        duration: 3000
      })
    },

    presentLoadingDots () {
      this.$loading.present({
        spinner: 'dots',
        content: 'This is the "dots" spinner. It will dismiss after 3 seconds.',
        duration: 3000
      })
    },

    presentLoadingBubbles () {
      this.$loading.present({
        spinner: 'bubbles',
        content: 'This is the "bubbles" spinner. It will dismiss after 3 seconds.',
        duration: 3000
      })
    },

    presentLoadingCircles () {
      this.$loading.present({
        spinner: 'circles',
        content: 'This is the "circles" spinner. It will dismiss after 3 seconds.',
        duration: 3000
      })
    },

    presentLoadingCrescent () {
      this.$loading.present({
        spinner: 'crescent',
        content: 'This is the "crescent" spinner. It will dismiss after 3 seconds.',
        duration: 3000
      })
    },

    presentLoadingDefault () {
      this.$loading.present({
        content: 'This is the mode specific spinner. It will dismiss after 3 seconds.',
        duration: 3000
      })
    },

    presentLoadingCustom () {
      this.$loading.present({
        spinner: 'hide',
        content: `
        <div class="loading-custom-spinner-container">
          <div class="loading-custom-spinner-box"></div>
        </div>
        <div>This is a custom spinner. It will dismiss after 3 seconds.</div>`,
        duration: 13000
      })
    },

    presentLoadingText () {
      this.$loading.present({
        spinner: 'hide',
        content: 'This has no spinner, only text. It will dismiss after 3 seconds.',
        duration: 3000
      })
    }
  }
}
</script>
