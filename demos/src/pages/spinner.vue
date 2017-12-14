<template>
  <vm-page v-nav="{title: 'Spinner'}">
    <vm-content class="outer-content">

      <vm-list title="Spinner Loading Indicators">
        <vm-item detail-push @click.native="showLoading('ios', 3000)">
          <vm-spinner slot="item-start" name="ios"></vm-spinner>
          Show iOS
        </vm-item>
        <vm-item detail-push @click.native="showLoading('ios-small', 3000)">
          <vm-spinner slot="item-start" name="ios-small"></vm-spinner>
          Show iOS Small
        </vm-item>
        <vm-item detail-push @click.native="showLoading('dots', 3000)">
          <vm-spinner slot="item-start" name="dots"></vm-spinner>
          Show Dots
        </vm-item>
        <vm-item detail-push @click.native="showLoading('bubbles', 3000)">
          <vm-spinner slot="item-start" name="bubbles"></vm-spinner>
          Show Bubbles
        </vm-item>
        <vm-item detail-push @click.native="showLoading('circles', 3000)">
          <vm-spinner slot="item-start" name="circles"></vm-spinner>
          Show Circles
        </vm-item>
        <vm-item detail-push @click.native="showLoading('crescent', 3000)">
          <vm-spinner slot="item-start" name="crescent"></vm-spinner>
          Show Crescent
        </vm-item>
      </vm-list>

      <vm-list title="Custom Loading Indicators">
        <vm-item detail-push @click.native="showCustomLoading()">Show Custom</vm-item>
        <vm-item detail-push @click.native="showLoadingText()">Show Text Only</vm-item>
      </vm-list>

    </vm-content>
  </vm-page>
</template>

<script>
  import Loading from 'vimon/components/loading'
  export default {
    methods: {
      showLoading (name, duration) {
        Loading.present({
          spinner: name,
          content: 'This is the "' + name + '" spinner. It will dismiss after ' + duration / 1000 + 'seconds.',
          duration: duration
        }).then((res) => {
          console.log('loading hide.', res)
        })
      },

      showCustomLoading () {
        Loading.present({
          spinner: 'circles',
          content: 'This is the spinner with "enableBackdropDismiss = true".',
          duration: 100000,
          enableBackdropDismiss: true
        }).then((res) => {
          console.log('loading hide.', res)
        })
      },

      showLoadingText () {
        Loading.present({
          content: 'This is the ONLY TEXT spinner. It will dismiss after  3 seconds.',
          duration: 3000
        }).then((res) => {
          console.log('loading hide.', res)
        })
      }
    }
  }
</script>
