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
        <vm-item @click="presentLoadingSpinner()">
          Show Spinner Only
        </vm-item>
        <vm-item @click="presentLoadingText()">
          Show Text Only
        </vm-item>
      </vm-list>

    </vm-content>

  </vm-page>
</template>

<script type="text/javascript">
import { Button, List, ListHeader, Item, Icon, Spinner, Loading } from 'vimon'
export default {
  name: 'DemoSpinner',
  components: {
    'vm-button': Button,
    'vm-list': List,
    'vm-list-header': ListHeader,
    'vm-item': Item,
    'vm-icon': Icon,
    'vm-spinner': Spinner
  },
  methods: {
    presentLoadingIos () {
      Loading.present({
        spinner: 'ios',
        content: 'This is the "ios" spinner. It will dismiss after 3 seconds.',
        duration: 3000
      })
    },

    presentLoadingDots () {
      Loading.present({
        spinner: 'dots',
        content: 'This is the "dots" spinner. It will dismiss after 3 seconds.',
        duration: 3000
      })
    },

    presentLoadingBubbles () {
      Loading.present({
        spinner: 'bubbles',
        content: 'This is the "bubbles" spinner. It will dismiss after 3 seconds.',
        duration: 3000
      })
    },

    presentLoadingCircles () {
      Loading.present({
        spinner: 'circles',
        content: 'This is the "circles" spinner. It will dismiss after 3 seconds.',
        duration: 3000
      })
    },

    presentLoadingCrescent () {
      Loading.present({
        spinner: 'crescent',
        content: 'This is the "crescent" spinner. It will dismiss after 3 seconds.',
        duration: 3000
      })
    },

    presentLoadingDefault () {
      Loading.present({
        content: 'This is the mode specific spinner. It will dismiss after 3 seconds.',
        duration: 3000
      })
    },

    presentLoadingCustom () {
      Loading.present({
        spinner: 'hide',
        content: `
        <div class="loading-custom-spinner-container">
          <div class="loading-custom-spinner-box"></div>
        </div>
        <div>This is a custom spinner. It will dismiss after 3 seconds.</div>`,
        duration: 3000
      })
    },

    presentLoadingSpinner () {
      Loading.present({
        spinner: 'ios',
        duration: 3000
      })
    },

    presentLoadingText () {
      Loading.present({
        spinner: 'hide',
        content: 'This has no spinner, only text. It will dismiss after 3 seconds.',
        duration: 3000
      })
    }
  }
}
</script>
